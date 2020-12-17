// 타입스크립트에서 타입 검사 시 값의 '형태'가 중요
// '덕 타이핑' , '구조적 서브타이핑(structural subtyping)'
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 인터페이스는 이러한 타입의 형태를 결정하는 역할
// ------------------------------------------------------------------
// Object 타입의 인터페이스
// 1) 인터페이스 간단한 예제
function printLabel1(labeledObj) {
    console.log(labeledObj.label);
}
var myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);
function printLabel2(labeledObj) {
    console.log(labeledObj.label);
}
var myObj2 = { size: 10, label: "Size 10 Object" };
printLabel2(myObj2);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    // if(config.clor) { // 사용 가능한 속성이 아니므로 에러
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
// 객체 리터럴로 Point 생성. 처음 생성 시 할당한 값은 이후에 수정 불가
var p1 = { x: 10, y: 20 };
// p1.x = 20; // 오류
// - 추가, 변경 메소드가 제거된 array type인 ReadonlyArray<T> 타입 제공
var a = [1, 2, 3];
var ro = a;
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
var mySquare2 = createSquare({ width: 100, opacity: 0.5 });
// - 다른 변수에 할당하여 전달 (3)
var squareOptions = { colour: "red", width: 100 };
var mySquare3 = createSquare(squareOptions);
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
// - 매개변수의 이름이 같을 필요는 없다
var mySearch2;
mySearch2 = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
// - number 인덱서에서 리턴 타입은 string 인덱서에서 리턴된 타입의 하위 타입이어야 한다.
// - ==> number와 string index가 같은 값의 형태( 예) 1 과 "1" )일 때
// -     string index의 리턴 타입이 number index의 리턴 타입의 부모 타입이어야 한다.
// -     이는 객체 인덱싱 전에 string으로 변환하여 인덱싱 하기 때문
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var myArray2 = ["Alice", "Bob"];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
        this.currentTime = new Date();
    }
    return Clock;
}());
var Clock2 = /** @class */ (function () {
    function Clock2(h, m) {
        this.currentTime = new Date();
    }
    Clock2.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock2;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
var Clock3 = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.tick = function () {
        console.log("beep beep");
    };
    return Clock;
}());
var square = {};
square.color = "blue";
square.sideLength = 10;
var square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
function getCounter() {
    var counter = (function (start) { });
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
// ------------------------------------------------------------------
// 클래스를 확장한 인터페이스
// - 클래스의 멤버변수만 상속받고 구현은 상속받지 않음
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
// class Image2 implements SelectableControl {
//     private state : any;
//     select() {}
// }
// class Location2 {
// }
