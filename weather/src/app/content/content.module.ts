import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SectionModule } from './section.module';



@NgModule({
  declarations: [
    ContentComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    SectionModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
