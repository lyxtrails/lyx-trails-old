import { Component } from '@angular/core';

@Component({
  template:  `
  <div style="overflow: auto">
    <div class="nav-side-menu">
      <div class="brand">App Dev</div>
        <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        <div class="menu-list">
          <ul id="menu-content" class="menu-content collapse out">

            <li>Python</li>

            <li>Java</li>

            <li data-toggle="collapse" data-target="#JavaScript" class="collapsed">
              <a>JavaScript<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="JavaScript">
              <li>node.js</li>
            </ul>


            <li>Golang</li>

            <li>C/C++</li>

          </ul>
        </div>
    </div>
  </div>
  `,
  styleUrls: ['../app.component.css'],
})
export class CSAppDevComponent { }
