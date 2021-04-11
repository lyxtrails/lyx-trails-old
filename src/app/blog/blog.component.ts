import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  template: `

    <ul style="list-style-type: none;" id="blogList">
      <li *ngFor="let blog of blogsPage; let i = index" >
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

    <mat-paginator (page)="handlePageEvent($event)"
                   [length]="blogsLength"
                   [pageSize]="pageSize"
                   [showFirstLastButtons]="showFirstLastButtons"
                   [pageSizeOptions]="pageSizeOptions"
                   [pageIndex]="pageIndex">
    </mat-paginator>

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
  blogs = [];
  editMode: boolean;

  blogsLength = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];
  pageSize = this.pageSizeOptions[0];
  showFirstLastButtons = true;
  blogsPage = [];

  constructor(private af: AngularFirestore, route: ActivatedRoute) {
    this.db = af;
    route.queryParams.subscribe(params => {
        this.editMode = params['editMode'];
    });
  }


  ngOnInit() {
    this.db.collection('Blogs')
    .valueChanges({idField: 'docID'})
    .pipe(
      map((results) => {
        return results.sort((a, b) => a["date"] > b["date"] ? -1 : 1)
      })
    )
    .subscribe(results => {
      this.blogs = results;
      this.blogsLength = results.length;
      this.setBlogsPage();
    })
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setBlogsPage();
  }

  setBlogsPage() {
    let totalCount = this.blogs.length;
    let startIdx = this.pageIndex * this.pageSize;
    this.blogsPage = this.blogs.slice(startIdx, Math.min(totalCount, startIdx+this.pageSize))
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