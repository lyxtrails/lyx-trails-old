import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  template: `
    <ul style="list-style-type: none;" id="blogList">
      <li *ngFor="let blog of blogs | async; let i = index" >
        <a style="cursor:pointer;" data-toggle="collapse" [attr.data-target]="'#blog'+i">
          {{blog['date']}} {{blog['title']}}
        </a>
        <div [attr.id]="'blog'+i" class="collapse" data-parent="#blogList" style="margin-left: 2em;">
          {{blog['content']}}
          <div [innerHTML]="blog['html'] | safeHtml"></div>
        </div>
      </li>
    </ul>
  `
})

export class BlogComponent {
  blogs: Observable<any[]>;
  constructor(private db: AngularFirestore) {
    this.blogs = db.collection('Blogs').valueChanges();
  }
}