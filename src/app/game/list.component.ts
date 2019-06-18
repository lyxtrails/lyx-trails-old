import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

@Component({
  template: `
    <table class="table table-inverse" style="table-layout: fixed; width:800px;">
      <thead><th style="border:none"><strong>1st</strong></th></thead>
      <tbody>
        <tr *ngFor="let game of gameList_1st | async">
          <td>{{ game.name }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.date }}</td>
        </tr>
      </tbody>
    </table>

    <br>

    <table class="table table-inverse" style="table-layout: fixed; width:800px;">
      <thead><th style="border:none"><strong>2nd</strong></th></thead>
      <tbody>
        <tr *ngFor="let game of gameList_2nd | async">
          <td>{{ game.name }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.date }}</td>
        </tr>
      </tbody>
    </table>

    <br>

    <table class="table table-inverse" style="table-layout: fixed; width:800px;">
      <thead><th style="border:none"><strong>3rd</strong></th></thead>
      <tbody>
        <tr *ngFor="let game of gameList_3rd | async">
          <td>{{ game.name }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.date }}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class GameListComponent {
  gameList_1st: Observable<any>;
  gameList_2nd: Observable<any>;
  gameList_3rd: Observable<any>;

  compare(obj1: any, obj2: any) {
    const a = obj1.date;
    const b = obj2.date;
    if (a == "Released" || b == "Released") {
      return a == "Released" ? 1 : -1;
    } else if (a == "TBD" || b == "TBD") {
      return a == "TBD" ? 1 : -1;
    } else if (a.length > 3 && b.length > 3) {
      if (a.substring(0, 4) == b.substring(0, 4)) {
        if (a.length > 6 && b.length > 6) {
          if (a.substring(5, 7) == b.substring(5, 7)) {
            if (a.length == 10 && b.length == 10) {
              return a.substring(8, 10) > b.substring(8, 10) ? 1 : -1;
            } else {
              return a.length < b.length ? 1 : -1;
            }
          } else {
            return a.substring(5, 7) > b.substring(5, 7) ? 1 : -1;
          }
        } else {
          return a.length < b.length ? 1 : -1;
        }
      } else {
        return a.substring(0, 4) > b.substring(0, 4) ? 1 : -1;
      }
    } else {
      return a.length < b.length ? 1 : -1;
    }
  }

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

  constructor(db: AngularFireDatabase) {
    db.list('Tables/GameList/1st').valueChanges()
    .subscribe((list) => { 
      this.gameList_1st = of(this.mergeSort(list))
    }, (err) => { console.log(err.code) });

    db.list('Tables/GameList/2nd').valueChanges()
    .subscribe((list) => { 
      this.gameList_2nd = of(this.mergeSort(list)) 
    }, (err) => { console.log(err.code) });

    db.list('Tables/GameList/3rd').valueChanges()
    .subscribe((list) => { 
      this.gameList_3rd = of(this.mergeSort(list))  
    }, (err) => { console.log(err.code) });
  }
}
