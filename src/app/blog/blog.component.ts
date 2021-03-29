import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  template: `
    <ul style="list-style-type: none;" id="blogList">
      <li *ngFor="let blog of blogs | async; let i = index" >
        <a *ngIf="editMode" style="color:#e05122; padding-right:10px; cursor:pointer;"
           (click)="deleteBlog(blog['docID'])">Delete</a>
        <a style="cursor:pointer;" data-toggle="collapse" [attr.data-target]="'#blog'+i">
          {{blog['date']}} {{blog['title']}}
        </a>
        <div [attr.id]="'blog'+i" class="collapse" data-parent="#blogList" style="margin-left: 2em;">
          {{blog['content']}}
          <div [innerHTML]="blog['html'] | safeHtml"></div>
        </div>
      </li>
    </ul>
    <div *ngIf="editMode">
      <mat-form-field style="width: 100%;">
        <mat-label style="color:white">Title</mat-label>
        <input #blogTitle matInput>
      </mat-form-field>
      <mat-form-field style="width: 100%;">
        <mat-label style="color:white">Content</mat-label>
        <textarea #blogContent matInput></textarea>
      </mat-form-field>
      <mat-form-field style="width: 100%;">
        <mat-label style="color:white">Extra HTML</mat-label>
        <textarea #blogExHtml matInput></textarea>
      </mat-form-field>
      <button (click)="addBlog(blogTitle.value, blogContent.value, blogExHtml.value)"
              class="btn btn-secondary">
        Submit
      </button>
    </div>
  `
})

export class BlogComponent {
  db: AngularFirestore;
  blogs: Observable<any[]>;
  editMode: boolean;
  constructor(private af: AngularFirestore, route: ActivatedRoute) {
    this.db = af;
    this.blogs = this.db.collection('Blogs').valueChanges({idField: 'docID'})
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