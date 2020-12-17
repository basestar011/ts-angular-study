// 타입스크립트에서 타입 검사 시 값의 '형태'가 중요
// '덕 타이핑' , '구조적 서브타이핑(structural subtyping)'
// 인터페이스는 이러한 타입의 형태를 결정하는 역할
// ------------------------------------------------------------------
// Object 타입의 인터페이스
// 1) 인터페이스 간단한 예제
function printLabel1(labeledObj) {
    console.log(labeledObj.label);
}
let myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);
function printLabel2(labeledObj) {
    console.log(labeledObj.label);
}
let myObj2 = { size: 10, label: "Size 10 Object" };
printLabel2(myObj2);
function createSquare(config) {
    let newSquare = { color: "white", area: 100 };
    // if(config.clor) { // 사용 가능한 속성이 아니므로 에러
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare = createSquare({ color: "black" });
// 객체 리터럴로 Point 생성. 처음 생성 시 할당한 값은 이후에 수정 불가
let p1 = { x: 10, y: 20 };
// p1.x = 20; // 오류
// - 추가, 변경 메소드가 제거된 array type인 ReadonlyArray<T> 타입 제공
let a = [1, 2, 3];
let ro = a;
// ro[0] = 3; // 에러
// ro.push(5); // 에러
// ro.length = 100; // 에러
// a = ro; // 일반 배열에 재할당 불가
a = ro; // type assertion 으로는 가능
// (readonly 와 const)
// - readonly는 프로퍼티에, const는 변수에 사용
// 4) Excess Property Checks
// - 객체 리터럴이 다른 변수에 할당되거나 인수로 전달될 때 Excess Property Checks 를 받는다
// - target type이 가지고 있지 않은 프로퍼티를 갖고 있으면 에러 발생.
// let mySquare = createSquare({ colour : "red", width : 100 });
// - Excess Property Checks 피하는 방법
// - type assertion을 사용하면 통과 (1)
let mySquare2 = createSquare({ width: 100, opacity: 0.5 });
// - 다른 변수에 할당하여 전달 (3)
let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare(squareOptions);
let mySearch;
mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};
// - 매개변수의 이름이 같을 필요는 없다
let mySearch2;
mySearch2 = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
let myArray;
myArray = ["Bob", "Fred"];
let myStr = myArray[0];
// - number 인덱서에서 리턴 타입은 string 인덱서에서 리턴된 타입의 하위 타입이어야 한다.
// - ==> number와 string index가 같은 값의 형태( 예) 1 과 "1" )일 때
// -     string index의 리턴 타입이 number index의 리턴 타입의 부모 타입이어야 한다.
// -     이는 객체 인덱싱 전에 string으로 변환하여 인덱싱 하기 때문
class Animal {
}
class Dog extends Animal {
}
let myArray2 = ["Alice", "Bob"];
class Clock {
    constructor(h, m) {
        this.currentTime = new Date();
    }
}
class Clock2 {
    constructor(h, m) {
        this.currentTime = new Date();
    }
    setTime(d) {
        this.currentTime = d;
    }
}
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
class DigitalClock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock {
    constructor(h, m) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
const Clock3 = class Clock {
    constructor(h, m) { }
    tick() {
        console.log("beep beep");
    }
};
let square = {};
square.color = "blue";
square.sideLength = 10;
let square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
function getCounter() {
    let counter = (function (start) { });
    counter.interval = 123;
    counter.reset = function () { };
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
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}
// class Image2 implements SelectableControl {
//     private state : any;
//     select() {}
// }
// class Location2 {
// }
