import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  template: `
  <div *ngIf="isAuthorized === false; else showGameList">
    You are not authorized to view this page.
  </div>
  <ng-template #showGameList>
    <table class="table table-inverse" style="table-layout: fixed;">
      <thead><th style="border:none"><strong>1st</strong></th></thead>
      <tbody>
        <tr *ngFor="let game of gameList_1st | async">
          <td>{{ game.name }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.date }}</td>
          <td *ngIf="editMode" style="border:none">
            <a (click)="removeItem('Tables/GameList/1st', game.name)" style="color:#e05122;
               padding-left: 20px;">Remove</a>
          </td>
        </tr>
        <tr *ngIf="editMode">
          <td>
            <mat-form-field>
              <mat-label style="color:white">Game Name</mat-label>
              <input #name1st matInput placeholder="Kiseki">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <mat-label style="color:white">Platform</mat-label>
              <input #platform1st matInput placeholder="PS4/NS/etc">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <mat-label style="color:white">Release Date</mat-label>
              <input #date1st matInput placeholder="2020.01.01 or TBD or Released">
            </mat-form-field>
          </td>
          <td style="border:none;">
            <a (click)="addItem('Tables/GameList/1st', name1st.value, platform1st.value, date1st.value)"
               style="padding-left:20px; cursor:pointer; color:#009111;">Add</a>
          </td>
        </tr>
      </tbody>
    </table>

    <br>

    <table class="table table-inverse" style="table-layout: fixed;">
      <thead><th style="border:none"><strong>2nd</strong></th></thead>
      <tbody>
        <tr *ngFor="let game of gameList_2nd | async">
          <td>{{ game.name }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.date }}</td>
          <td *ngIf="editMode" style="border:none">
            <a (click)="removeItem('Tables/GameList/2nd', game.name)" style="color:#e05122;
               padding-left: 20px;">Remove</a>
          </td>
        </tr>
        <tr *ngIf="editMode">
          <td>
            <mat-form-field>
              <mat-label style="color:white">Game Name</mat-label>
              <input #name2nd matInput placeholder="Kiseki">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <mat-label style="color:white">Platform</mat-label>
              <input #platform2nd matInput placeholder="PS4/NS/etc">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <mat-label style="color:white">Release Date</mat-label>
              <input #date2nd matInput placeholder="2020.01.01 or TBD or Released">
            </mat-form-field>
          </td>
          <td style="border:none;">
            <a (click)="addItem('Tables/GameList/2nd', name2nd.value, platform2nd.value, date2nd.value)"
               style="padding-left:20px; cursor:pointer; color:#009111;">Add</a>
          </td>
        </tr>
      </tbody>
    </table>

    <br>

    <table class="table table-inverse" style="table-layout: fixed;">
      <thead><th style="border:none"><strong>3rd</strong></th></thead>
      <tbody>
        <tr *ngFor="let game of gameList_3rd | async">
          <td>{{ game.name }}</td>
          <td>{{ game.platform }}</td>
          <td>{{ game.date }}</td>
          <td *ngIf="editMode" style="border:none">
            <a (click)="removeItem('Tables/GameList/3rd', game.name)" style="color:#e05122;
               padding-left: 20px;">Remove</a>
          </td>
        </tr>
        <tr *ngIf="editMode">
          <td>
            <mat-form-field>
              <mat-label style="color:white">Game Name</mat-label>
              <input #name3rd matInput placeholder="Kiseki">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <mat-label style="color:white">Platform</mat-label>
              <input #platform3rd matInput placeholder="PS4/NS/etc">
            </mat-form-field>
          </td>
          <td>
            <mat-form-field>
              <mat-label style="color:white">Release Date</mat-label>
              <input #date3rd matInput placeholder="2020.01.01 or TBD or Released">
            </mat-form-field>
          </td>
          <td style="border:none;">
            <a (click)="addItem('Tables/GameList/3rd', name3rd.value, platform3rd.value, date3rd.value)"
               style="padding-left:20px; cursor:pointer; color:#009111;">Add</a>
          </td>
        </tr>
      </tbody>
    </table>
  </ng-template>
  `,
  styleUrls: ['../app.component.css'],
})
export class GameListComponent {
  db: AngularFireDatabase;
  isAuthorized: boolean;
  editMode: boolean;
  gameList_1st: Observable<any>;
  gameList_2nd: Observable<any>;
  gameList_3rd: Observable<any>;

  constructor(db: AngularFireDatabase, route: ActivatedRoute) {
    this.db = db;
    route.queryParams.subscribe(params => {
        this.editMode = params['editMode'];
    });

    this.isAuthorized = true;
    const tableNames = [
      'Tables/GameList/1st',
      'Tables/GameList/2nd',
      'Tables/GameList/3rd',
    ]
    tableNames.forEach((tableName) => {
      this.db.list(tableName).valueChanges()
      .subscribe((list) => { 
        switch(tableName) {
          case 'Tables/GameList/1st':
            this.gameList_1st = of(this.mergeSort(list))
            break;
          case 'Tables/GameList/2nd':
            this.gameList_2nd = of(this.mergeSort(list))
            break;
          case 'Tables/GameList/3rd':
            this.gameList_3rd = of(this.mergeSort(list))
            break;
          default:
            throw 'Unknown table name'
        }
      }, (err) => {
        if (err.code === 'PERMISSION_DENIED') {
          this.isAuthorized = false;
        }
        console.log(err.code) 
      });

    })
  }

  compare(obj1: any, obj2: any) {
    const a = obj1.date;
    const b = obj2.date;
    if (a == "Released" || b == "Released") {
      return a == "Released" ? 1 : -1;
    } else if (a == "TBD" || b == "TBD") {
      return a == "TBD" ? 1 : -1;
    } else if (a.length > 3 && b.length > 3) {
      // If the same year
      if (a.substring(0, 4) == b.substring(0, 4)) {
        // If the date contains month
        if (a.length > 6 && b.length > 6) {
          // If the same month
          if (a.substring(5, 7) == b.substring(5, 7)) {
            // If full date, then compare day
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

  addItem(table: string, name: string, platform: string, date: string) {
    const ref$ = this.db.object(table + '/' + name);
    ref$.set({
      name: name,
      platform: platform,
      date: date
    });
  }

  removeItem(table: string, name: string) {
    const ref$ = this.db.list(table, ref => 
      ref.orderByChild('name').equalTo(name)
    )
    ref$.snapshotChanges().subscribe((list) => {
      this.db.object(table + '/' + list[0].key).remove()
    })
  }
}
