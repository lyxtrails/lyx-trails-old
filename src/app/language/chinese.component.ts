declare const require: any
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Http } from '@angular/http';
const showdown = require('showdown');
const converter = new showdown.Converter();
@Component({
  template:  `
  <div style="overflow: auto">
    <div class="nav-side-menu">
      <div class="brand">Chinese</div>
        <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        <div class="menu-list">
          <ul id="menu-content" class="menu-content collapse out">

            <li (click)="readHtml('pinyin.html')">PinYin</li>

          </ul>
        </div>
    </div>
    <div style="padding-left:160px" [innerHtml]="html | safeHtml"></div>
  </div>
  `,
  styleUrls: ['../app.component.css']
})
export class LangCHComponent {
  html = 'Chinese';
  constructor(private http:Http) {
    
  }
  readFile(file) {
    this.http.get('assets/md/language/chinese/'+file)
    .subscribe(res => {
      this.html = converter.makeHtml(res.text())
    });
  }
  readHtml(htmlFile) {
    this.http.get('assets/html/lang/ch/'+htmlFile)
    .subscribe(res => {
      this.html = res.text()
    });
  }
}
