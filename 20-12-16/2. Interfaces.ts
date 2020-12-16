// 타입스크립트에서 타입 검사 시 값의 '형태'가 중요
// '덕 타이핑' , '구조적 서브타이핑(structural subtyping)'

// 인터페이스는 이러한 타입의 형태를 결정하는 역할

// ------------------------------------------------------------------
// Object 타입의 인터페이스

// 1) 인터페이스 간단한 예제
function printLabel1(labeledObj : {label : string}) {
    console.log(labeledObj.label);
}

let myObj1 = {size: 10, label : "Size 10 Object"};
printLabel1(myObj1);

// printLabel1 함수는 string 타입의 label 프로퍼티를 갖는 객체를 매개변수로 가진다.
// 해당 함수를 호출 시 파라미터의 전체 프로퍼티는 관계 없이
// 최소한의 프로퍼티가 있는지와 타입이 잘 맞는지만 검사

interface LabeledValue {
    label : string;
}

function printLabel2(labeledObj : LabeledValue) {
    console.log(labeledObj.label);
}

let myObj2 = {size: 10, label : "Size 10 Object"};
printLabel2(myObj2);

// 명시적으로 해당 인터페이스 처럼 구현할 필요 없이
// '형태'만 충족하면 허용



// 2) Optional Properties

// - 객체 안의 몇 개의 프로퍼티만 채워 전달 가능
// - 선택적 프로퍼티로 사용할 때는 해당 프로퍼티 이름 끝에 '?'를 붙여 표시
interface SquareConfig {
    color? : string;
    width? : number;
}

function createSquare(config : SquareConfig) : {color : string; area : number} {
    let newSquare = {color : "white", area : 100};
    
    // if(config.clor) { // 사용 가능한 속성이 아니므로 에러
    if(config.color) {
        newSquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color : "black"});



// 3) Readonly properties

// - 객체가 처음 생성될 때만 수정 가능
// - 프로퍼티 이름 앞에 'readonly'를 붙여 지정
interface Point {
    readonly x : number;
    readonly y : number;
}

// 객체 리터럴로 Point 생성. 처음 생성 시 할당한 값은 이후에 수정 불가
let p1 : Point = {x : 10, y : 20};
// p1.x = 20; // 오류

// - 추가, 변경 메소드가 제거된 array type인 ReadonlyArray<T> 타입 제공
let a : number[] = [1,2,3];
let ro : ReadonlyArray<number> = a;
// ro[0] = 3; // 에러
// ro.push(5); // 에러
// ro.length = 100; // 에러
// a = ro; // 일반 배열에 재할당 불가
a = ro as number[]; // type assertion 으로는 가능

// (readonly 와 const)
// - readonly는 프로퍼티에, const는 변수에 사용



// 4) Excess Property Checks

// - 객체 리터럴이 다른 변수에 할당되거나 인수로 전달될 때 Excess Property Checks 를 받는다
// - target type이 가지고 있지 않은 프로퍼티를 갖고 있으면 에러 발생.

// let mySquare = createSquare({ colour : "red", width : 100 });

// - Excess Property Checks 피하는 방법
// - type assertion을 사용하면 통과 (1)
let mySquare2 = createSquare({ width : 100, opacity : 0.5 } as SquareConfig);

// - 추가 프로퍼티가 있음을 확신할 때 string index signature 를 추가해서 통과 (2)
interface SquareConfig {
    color? : string;
    width? : number;
    [propName : string]: any;
}

// - 다른 변수에 할당하여 전달 (3)
let squareOptions = { colour : "red", width : 100 };
let mySquare3 = createSquare(squareOptions);

// (3) 사용 시 공통 객체 프로퍼티가 없으면 에러 발생
// let squareOptions2 = { colour: "red" };
// let mySquare4 = createSquare(squareOptions2);



// ------------------------------------------------------------------
// 함수 타입의 인터페이스

// - 매개변수 목록과 return 타입을 선언하는 함수선언과 비슷함
interface SearchFunc {
    (source : string, subString : string) : boolean;
}

let mySearch : SearchFunc;
mySearch = function (source : string, subString : string) {
    let result = source.search(subString);
    return result > -1;
}

// - 매개변수의 이름이 같을 필요는 없다
let mySearch2 : SearchFunc;
mySearch2 = function(src : string, sub : string) : boolean {
    let result = src.search(sub);
    return result > -1;
}

// - SearchFunc 타입으로 함수가 할당되었기 때문에
// - 명시적으로 매개변수의 타입과 return 타입을 지정하지 않아도 된다

// 인터페이스에 정의된 return 타입과 일치하지 않으면 에러 발생
// let mySearch3 : SearchFunc;
// mySearch3 = function(src, sub) {
//   let result = src.search(sub);
//   return "string";
// };


// ------------------------------------------------------------------
// Indexable 타입의 인터페이스

// - index signature 방식으로 기술
// - index signature 에는 string과 number 타입 지원
interface StringArray {
    [index : number] : string;
}

let myArray : StringArray;
myArray = ["Bob", "Fred"];

let myStr : string = myArray[0];

// - number 인덱서에서 리턴 타입은 string 인덱서에서 리턴된 타입의 하위 타입이어야 한다.
// - ==> number와 string index가 같은 값의 형태( 예) 1 과 "1" )일 때
// -     string index의 리턴 타입이 number index의 리턴 타입의 부모 타입이어야 한다.
// -     이는 객체 인덱싱 전에 string으로 변환하여 인덱싱 하기 때문

class Animal {
    name : string;
}
class Dog extends Animal {
    breed : string;
}

// interface NotOkay {
//     [x : number] : Animal;
//     [x : string] : Dog;
// }
// 에러!

// - obj.property 와 obj["property"] 가 같은 방법이기 때문에
//   string index signature 는 다른 모든 프로퍼티의 리턴 타입이 일치 혹은 하위 타입이 되도록 강제
// interface NumberDictionary {
//     [index : string] : number;
//     length : number;    // 성공
//     name : string;      // 오류 (number의 하위 타입이 아님)
// }

// - index signature가 프로퍼티 타입들의 합집합이면 가능
interface NumberOrStringDictionary {
    [index : string] : number | string;
    length : number;    // 성공, length는 숫자입니다
    name : string;      // 성공, name은 문자열입니다
}

// - readonly 가능
interface ReadonlyStringArray {
    readonly [index : number] : string;
}
let myArray2 : ReadonlyStringArray = ["Alice", "Bob"];
// myArray2[2] = "Mallory"; // 오류



// ------------------------------------------------------------------
// Class 타입의 인터페이스

// 1) 인터페이스 구현

// 기본 (1)
interface ClockInterface {
    currentTime : Date;
}

class Clock implements ClockInterface {
    currentTime : Date = new Date();
    constructor(h : number, m : number) {}
}

// 기본 (2) - 추상 메소드 포함
interface ClockInterface2 {
    currentTime : Date;
    setTime(d : Date) : void;
}

class Clock2 implements ClockInterface2 {
    currentTime : Date = new Date();
    setTime(d : Date) {
        this.currentTime = d;
    }
    constructor(h : number, m : number) { }
}

// - 인터페이스는 기본적으로 public을 기술하기 때문에
//   구현된 클래스 인스턴스의 private은 검사할 수 없다


// 2) 클래스에서의 스태틱 / 인스턴스 차이
interface ClockConstructor {
    new (hour : number, minute : number) : ClockInterface3;
}
interface ClockInterface3 {
    tick() : void;
}

function createClock(ctor : ClockConstructor, hour : number, minute : number) : ClockInterface3 {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface3 {
    constructor(h : number, m : number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface3 {
    constructor(h : number, m : number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// - 클래스 표현으로 구현
interface ClockConstructor2 {
    new (hour : number, minute : number);
}

interface ClockInterface4 {
    tick();
}

const Clock3 : ClockConstructor2 = class Clock implements ClockInterface4 {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}

// 3) 인터페이스 확장

// - 재사용성 높은 컴포넌트로 쪼갤 때 유용
interface Shape {
    color : string;
}

interface Square extends Shape {
    sideLength : number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

// - 여러 인터페이스를 확장
interface PenStroke {
    penWidth: number;
}

interface Square2 extends Shape, PenStroke {
    sideLength : number;
}

let square2 = {} as Square2;
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;



// ------------------------------------------------------------------
// Hybrid 타입의 인터페이스

// - 다양한 타입을 기술
// 예) 함수와 객체 역할 모두 수행하는 객체
interface Counter {
    (start : number) : string;
    interval : number;
    reset() : void;
}

function getCounter() : Counter {
    let counter = (function (start : number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;



// ------------------------------------------------------------------
// 클래스를 확장한 인터페이스

// - 클래스의 멤버변수만 상속받고 구현은 상속받지 않음
class Control {
    private state : any;
}

interface SelectableControl extends Control {
    select() : void;
}

class Button extends Control implements SelectableControl {
    select() {}
}

class TextBox extends Control {
    select() {}
}

// class Image2 implements SelectableControl {
//     private state : any;
//     select() {}
// }

// class Location2 {

// }