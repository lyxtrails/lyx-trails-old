import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <h2>Game Guide</h2>
    <ul style="list-style-type: none;" id="gameGuides">
      <li *ngFor="let co of gameGuide | async; let i = index" >
        <a style="cursor:pointer;" data-toggle="collapse" [attr.data-target]="'#co'+i">
          {{ co.key }}
        </a>
        <div [innerHTML]="expandList(co.val) | safeHtml" 
          [attr.id]="'co'+i" 
          class="collapse" 
          data-parent="#gameGuides">
        </div>
      </li>
    </ul>
  `,
})
export class GameGuideComponent {
  gameGuide: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.gameGuide = db.list('Tables/GameGuide').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, val: JSON.stringify(c.payload.val()) }))
      )
    );
  }
  expandList(list) {
    let html = `<ul style="list-style-type: none;">`
    JSON.parse(list).forEach((item) => {
      if (item.url)
        html +=`<li><a href=${item.url}>${item.name}</a></li>`
      else
        html +=`<li>${item.name}</li>`
    })
    html +=`</ul>`
    return html
  }
}
