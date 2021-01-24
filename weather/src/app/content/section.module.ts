import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path: 'index',
    component: SearchComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  declarations: [
    SearchComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SearchComponent,
    ResultComponent,
    RouterModule
  ]
})
export class SectionModule { }
