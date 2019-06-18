declare const require: any
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Http } from '@angular/http';
import { aiDoc } from './docs/ai';
const { readFile } = require('../app.js')
const showdown = require('showdown');
const converter = new showdown.Converter();
@Component({
  template: `
  <div style="overflow: auto">
    <div class="nav-side-menu">
      <div class="brand">AI</div>
        <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        <div class="menu-list">
          <ul id="menu-content" class="menu-content collapse out">

            <li (click)="readFile('minimax.md')">Mnimax</li>

            <li (click)="readFile('astar.md')">A* search</li>

            <li (click)="readFile('constraint_satisfaction.md')">Constraint Satisfaction</li>

            <li (click)="readFile('bayesNet.md')">Bayes Net</li>

            <li data-toggle="collapse" data-target="#local-search" class="collapsed">
              <a>Local Search<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="local-search">
              <li (click)="readFile('localSearch_hc.md')">Hill Climbing</li>
              <li (click)="readFile('localSearch_simulatedAnnealing.md')">Simulated Anealing</li>
            </ul>

            <li (click)="readFile('geneAlg.md')">Genetic Algorithm</li>

            <li (click)="readFile('hmm.md')">HMM</li>

            <li (click)="readFile('rl.md')">Reinforcement Learning</li>

            <li data-toggle="collapse" data-target="#ml" class="collapsed">
              <a>Machine Learning<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="ml">
              <li (click)="readFile('ml_ml.md')">Machine Learning</li>
              <li (click)="readFile('ml_nb.md')">Naive Bayes</li>
              <li (click)="readFile('ml_dt.md')">Decision Tree</li>
              <li (click)="readFile('ml_linearReg.md')">Linear Regression</li>
              <li (click)="readFile('ml_logisticReg.md')">Logistic Regression</li>
              <li (click)="readFile('ml_svm.md')">SVM</li>
              <li (click)="readFile('ml_kmeans.md')">k-means</li>
              <li (click)="readFile('ml_knn.md')">k-nn</li>
              <li (click)="readFile('ml_randomForest.md')">Random Forst</li>
              <li (click)="readFile('ml_ensembleLearning.md')">Ensemble Learning</li>
            </ul>


            <li data-toggle="collapse" data-target="#dl" class="collapsed">
              <a>Deep Learning<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="dl">
              <li (click)="readFile('dl_dnn.md')">DNN</li>
              <li (click)="readFile('dl_cnn.md')">CNN</li>
              <li (click)="readFile('dl_rnn.md')">RNN</li>
            </ul>

            <li data-toggle="collapse" data-target="#cv" class="collapsed">
              <a>Computer Vision<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="cv">
              <li (click)="readFile('cv_imgFiltering.md')">Image Filtering</li>
              <li (click)="readFile('cv_featureMatching.md')">Feature Matching</li>
            </ul>

            <li data-toggle="collapse" data-target="#gameai" class="collapsed">
              <a>Game AI<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="gameai">
              <li (click)="readFile('gameai_pathPlanning.md')">Path Planning</li>
              <li (click)="readFile('gameai_decisionMaking.md')">Decision Making</li>
              <li (click)="readFile('gameai_pcg.md')">PCG</li>
              <li (click)="readFile('gameai_gamePlaying.md')">Game Playing</li>
              <li (click)="readFile('gameai_camControl.md')">Camera Control</li>
            </ul>

            <li data-toggle="collapse" data-target="#tools" class="collapsed">
              <a>Tools<span class="arrow"></span></a>
            </li>
            <ul class="sub-menu collapse" id="tools">
              <li (click)="readFile('tools_spark.md')">Spark</li>
              <li (click)="readFile('tools_opencv.md')">OpenCV</li>
              <li (click)="readFile('tools_pytorch.md')">PyTorch</li>
            </ul>

          </ul>
        </div>
    </div>
    <div style="padding-left:160px" [innerHtml]="html | safeHtml"></div>
  </div>
  `,
  styleUrls: ['../app.component.css'],
})
export class CSAIComponent {
  html = aiDoc.homeHtml;
  constructor(private http:Http) { }
  readFile(file) {
    this.html = '<p>Loading...</p>';
    readFile('md/cs/ai/'+file, (text) => {
      this.html = converter.makeHtml(text);
    });
  }
}
