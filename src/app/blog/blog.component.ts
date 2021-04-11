import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['../app.component.css'],
})

export class BlogComponent {
  db: AngularFirestore;
  blogs = [];
  editMode: boolean;

  blogsLength = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];
  pageSize = this.pageSizeOptions[1];
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
    let date = datepipe.transform(new Date(), 'yyyy.MM.dd hh:mm:ss')
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