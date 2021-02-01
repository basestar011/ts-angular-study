import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private count$ = this.counterSubject.asObservable();

  constructor() {
  }

  public excute(val : number) {
    this.counterSubject.next(val);
  }

  private getCurrentValue() {
    return this.counterSubject.getValue();
  }

  public getObservableCounter() {
    return this.count$;
  }
}
