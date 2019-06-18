declare const require: any
import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { readLocalFile } = require('../../app.js')
const showdown = require('showdown');
const converter = new showdown.Converter();

@Component({
  template: `
    <p>{{gameGuide}}</p>
    <div style="padding-left:20px" [innerHtml]="html | safeHtml"></div>
  `,
})
export class RE7Component {
  html = 'Loading';
  constructor(private http:Http) {
    this.readFile('re7.md')
  }
  readFile(file) {
    this.html = 'Loading...'
    this.http.get('assets/md/gameGuide/'+file)
    .subscribe(res => {
      this.html = converter.makeHtml(res.text())
    });
  }
}
