import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyContentComponent } from './body-content/body-content.component';
import { LayoutModule } from './share/layout/layout.module';
import { BodyContentModule } from './body-content/body-content.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BodyContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
