import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { CounterService } from './counter.service';
import { RouterModule } from '@angular/router';

const counterRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: '',
    component: CounterComponent
  }
]);

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    counterRouting
  ],
  providers: [
    CounterService
  ]
})
export class CounterModule { }
