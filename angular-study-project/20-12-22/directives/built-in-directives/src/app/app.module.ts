import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- FormsModule 패키지 로드


import { AppComponent } from './app.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemSwitchComponents } from './item-switch.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    ItemSwitchComponents
  ],

  imports: [
    BrowserModule,
    FormsModule // <--- NgModule에 로드
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }