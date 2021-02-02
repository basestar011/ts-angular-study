import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';

const authRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    authRouting,
    SharedModule
  ]
})
export class AuthModule { }
