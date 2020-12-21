import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aliasing',
  templateUrl: './aliasing.component.html',
  styleUrls: ['./aliasing.component.css'],
  inputs: ['input1: saveForLaterItem'], // 프로퍼티_이름:클래스_밖에서_사용할_이름
  outputs: ['outputEvent1: saveForLaterEvent']

})
export class AliasingComponent {

  input1: string;
  outputEvent1: EventEmitter<string> = new EventEmitter<string>();

  @Input('wishListItem') input2: string; //  @Input(클래스_밖에서_사용할_이름)
  @Output('wishEvent') outputEvent2 = new EventEmitter<string>(); //  @Output(클래스_밖에서_사용할_이름) 프로퍼티_이름 = ...


  saveIt() {
    console.warn('Child says: emiting outputEvent1 with', this.input1);
    this.outputEvent1.emit(this.input1);
  }

  wishForIt() {
    console.warn('Child says: emiting outputEvent2', this.input2);
    this.outputEvent2.emit(this.input2);
  }


}