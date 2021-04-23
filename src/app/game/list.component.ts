import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../dialogs/messageDialog.component';

const TAG_RELEASED = 'Released';
const TAG_TBD = 'TBD';
const dateRe = /(?<year>\d{4})([.](?<month>\d{2})|)([.](?<day>\d{2})|)/;

interface GameTableRow {
  key: string,
  name: string,
  platform: string,
  date: string,
}

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['../app.component.css'],
})
export class GameListComponent {
  editMode: boolean;

  gameTables = [
    {
      'header': '1st',
      'list': new Observable<GameTableRow[]>(),
      'table': 'Tables/GameList/1st'
    },
    {
      'header': '2nd',
      'list': new Observable<GameTableRow[]>(),
      'table': 'Tables/GameList/2nd'
    },
    {
      'header': '3rd',
      'list': new Observable<GameTableRow[]>(),
      'table': 'Tables/GameList/3rd'
    }
  ]

  constructor(public db: AngularFireDatabase, public dialog: MatDialog, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
        this.editMode = params['editMode'];
    });

    this.gameTables.forEach((gameTable) => {
      let tableName = gameTable['table']
      this.db.list(gameTable['table']).valueChanges()
      .subscribe((list) => { 
        gameTable['list'] = of(this.mergeSort(list))
      });
    })
  }

  // This function compares 2 objects based on their months by the following criteria.
  // 1. Released is after TBD.
  // 2. TBD is after the one that has release date.
  // 3. Dates are sorted chronologically.
  // 4. Less specific dates are put before mroe specific date (e.g. 2000.01 is before 2000.01.01)
  compare(row1: GameTableRow, row2: GameTableRow) {
    if (row1 === undefined || row2 === undefined) {
      return row1 === undefined ? 1 : -1;
    }

    for (const tag of [TAG_RELEASED, TAG_TBD]) {
      if (row1.date == tag || row2.date == tag) {
        return row1.date == tag ? 1 : -1;
      }
      if (row1.date == tag && row2.date == tag) {
        return row1.name > row2.name ? 1 : -1;
      }
    }

    const m1 = dateRe.exec(row1.date);
    const m2 = dateRe.exec(row2.date);
    if (m1 === null || m2 === null) {
      return m1 === null ? 1 : -1;
    }

    const g1 = m1.groups
    const g2 = m2.groups
    if (g1.year != g2.year) {
      return g1.year > g2.year ? 1 : -1
    }
    if (g1.month != g2.month) {
      if (g1.month === undefined || g2.month === undefined) {
        return g1.month === undefined ? 1 : -1;
      }
      return g1.month > g2.month ? 1 : -1
    }
    if (g1.day != g2.day) {
      if (g1.day === undefined || g2.day === undefined) {
        return g1.day === undefined ? 1 : -1;
      }
      return g1.day > g2.day ? 1 : -1
    }

    return row1.name > row2.name ? 1 : -1;
  }

  // Merge sort a list of objects
  mergeSort(list: any[]): any[]{
    if (list.length == 0 || list.length == 1) {
      return list
    } else if (list.length == 2) {
      if (this.compare(list[0], list[1]) > 0) {
        return [list[1], list[0]]
      } else {
        return list
      }
    } else {
      const midIdx = list.length / 2;
      const list1 = this.mergeSort(list.slice(0, midIdx));
      const list2 = this.mergeSort(list.slice(midIdx, list.length));
      const ret = [];
      while (list1.length != 0 && list2.length != 0) {
        if (this.compare(list1[0], list2[0]) < 0) {
          ret.push(list1.shift());
        } else {
          ret.push(list2.shift());
        }
      }
      if (list1.length != 0) {
        return ret.concat(list1)  
      } else {
        return ret.concat(list2)  
      }
    }
  }

  addItem(table: string, name: string, platform: string, date: string) {
    const ref$ = this.db.object(table + '/' + name);
    ref$.set({
      name: name,
      platform: platform,
      date: date
    })
    .catch((err) => {
      if (err.code === 'PERMISSION_DENIED') {
        this.openDialog('User does not have permission to add item.')
      } else {
        this.openDialog('Got error: ' + err.code)
      }
    });
  }

  removeItem(table: string, key: string) {
    this.db.object(table + '/' + key).remove()
    .catch((err) => {
      if (err.code === 'PERMISSION_DENIED') {
        this.openDialog('User does not have permission to remove item.')
      } else {
        this.openDialog('Got error: ' + err.code)
      }
    });
  }

  openDialog(msg: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: msg }
    });
  }
}
