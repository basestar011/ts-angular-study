import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyContentComponent } from './body-content.component';
import { LayoutModule } from '../share/layout/layout.module';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [
    BodyContentComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BodyContentComponent,
    NavigationComponent
  ]
})
export class BodyContentModule { }
