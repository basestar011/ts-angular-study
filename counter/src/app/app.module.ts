import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterModule } from './counter/counter.module';
import { RouterModule } from '@angular/router';

const appRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    CounterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
