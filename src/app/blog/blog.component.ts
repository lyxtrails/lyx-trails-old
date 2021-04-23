import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../dialogs/messageDialog.component';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['../app.component.css'],
})

export class BlogComponent {
  blogs = [];
  editMode: boolean;

  blogsLength = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];
  pageSize = this.pageSizeOptions[1];
  showFirstLastButtons = true;
  blogsPage = [];

  constructor(private af: AngularFirestore, private dialog: MatDialog, route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
        this.editMode = params['editMode'];
    });
  }

  ngOnInit() {
    this.af.collection('Blogs')
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
    this.af.collection("Blogs").add({
        title: title,
        date: date,
        content: content,
        html: exHtml
    })
    .catch((err) => {
      if (err.code === 'permission-denied') {
        this.openDialog('User does not have permission to add item.')
      } else {
        this.openDialog('Got error: ' + err.code)
      }
    });
  }

  deleteBlog(docID: string) {
    this.af.collection("Blogs").doc(docID).delete()
    .catch((err) => {
      if (err.code === 'permission-denied') {
        this.openDialog('User does not have permission to add item.')
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