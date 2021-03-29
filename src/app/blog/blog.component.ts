import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  template: `
    <ul style="list-style-type: none;" id="blogList">
      <li *ngFor="let blog of blogs | async; let i = index" >
        <a *ngIf="editMode" style="color:#e05122; padding-right:10px; cursor:pointer;"
           (click)="deleteBlog(blog['docID'])">Delete</a>
        <a style="cursor:pointer;" data-toggle="collapse" [attr.data-target]="'#blog'+i">
          {{blog['date']}}&nbsp;&nbsp;{{blog['title']}}
        </a>
        <div [attr.id]="'blog'+i" class="collapse" data-parent="#blogList" style="margin-left: 2em;">
          {{blog['content']}}
          <div [innerHTML]="blog['html'] | safeHtml"></div>
        </div>
      </li>
    </ul>
    <div *ngIf="editMode">
      <mat-form-field style="width: 100%;" floatLabel="always">
        <mat-label style="color:white">Title</mat-label>
        <input #blogTitle matInput placeholder="Blog title">
      </mat-form-field>
      <mat-form-field style="width: 100%;" floatLabel="always">
        <mat-label style="color:white">Content</mat-label>
        <textarea #blogContent matInput placeholder="Blog content"></textarea>
      </mat-form-field>
      <mat-form-field style="width: 100%;" floatLabel="always">
        <mat-label style="color:white">Extra HTML</mat-label>
        <textarea #blogExHtml matInput placeholder="Extra HTML will be displayed as html elements under content"></textarea>
      </mat-form-field>
      <button (click)="addBlog(blogTitle.value, blogContent.value, blogExHtml.value)"
              class="btn btn-secondary">
        Submit
      </button>
    </div>
  `,
  styleUrls: ['../app.component.css'],
})

export class BlogComponent {
  db: AngularFirestore;
  blogs: Observable<any[]>;
  editMode: boolean;
  constructor(private af: AngularFirestore, route: ActivatedRoute) {
    this.db = af;
    this.blogs = this.db.collection('Blogs')
      .valueChanges({idField: 'docID'})
      .pipe(
        map(results => results.sort((a, b) => {
          return a["date"] > b["date"] ? -1 : 1
        }))
      )
    route.queryParams.subscribe(params => {
        this.editMode = params['editMode'];
    });
  }

  addBlog(title: string, content: string, exHtml: string) {
    const datepipe: DatePipe = new DatePipe('en-US')
    let date = datepipe.transform(new Date(), 'yyyy.MM.dd')
    this.db.collection("Blogs").add({
        title: title,
        date: date,
        content: content,
        html: exHtml
    })
  }
  deleteBlog(docID: string) {
    this.db.collection("Blogs").doc(docID).delete()
  }
}