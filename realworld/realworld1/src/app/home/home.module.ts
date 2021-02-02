import { ModuleWithProviders, NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    homeRouting,
    SharedModule
  ]
})
export class HomeModule { }
