// 타입스크립트의 데이터 타입 : 자바스크립트와 거의 동일한 데이터 타입 지원
// 데이터 타입 종류
// 1) Boolean
var isDone = false;
// 2) Number
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
// 3) String
var color = "blue";
color = 'red';
// - 템플릿 문자열 사용
var fullName = "Bob Bobbington";
var age = 37;
var sentence1 = "Hello, my name is " + fullName + ".\nI'll be " + (age + 1) + " years old next month.";
// - 일반 문자열 사용
var sentence2 = "Hello, my name is " + fullName + ".\n\n" + "I'll be " + (age + 1) + " years old next month.";
// 4) Array
// - 배열 타입 뒤에 [] 사용
var list1 = [1, 2, 3];
// - 제네릭 배열 타입 사용
var list2 = [1, 2, 3];
// 5) Tuple - 크기와 각 요소의 타입을 고정한 배열을 표현
// tuple 타입으로 선언
var x;
// 값 초기화
x = ["hello", 10];
// 잘못된 초기화
// x = [10, "hello"];
console.log(x[0].substring(1)); // 성공
//console.log(x[1].substring(1)); // 오류
// x[3] = "wolrd"; // 오류
// console.log(x[5].toString()); // 오류
// 6) Enum
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 1] = "Green";
    Color1[Color1["Blue"] = 2] = "Blue";
})(Color1 || (Color1 = {}));
var c1 = Color1.Red;
// - 기본적으로 enum의 인덱스는 0부터 시작
// - 인덱스를 임의로 설정할 수 있음
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
var c2 = Color2.Green;
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
var c3 = Color3.Blue;
// 인덱스 값으로 해당 enum 값을 얻을 수도 있음
var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 2] = "Red";
    Color4[Color4["Green"] = 3] = "Green";
    Color4[Color4["Blue"] = 4] = "Blue";
})(Color4 || (Color4 = {}));
var colorName = Color4[3];
console.log(colorName); // Green
// 7) Any
// - 알지 못하는 타입. 임의의 타입, 컴파일 통과
var notSure1 = 4;
notSure1 = "maybe a string instead";
notSure1 = false;
var notSure2 = 4;
notSure2.ifItExist(); // 성공
notSure2.toFixed(); // 성공
var prettySure = 4;
// prettySure.toFixed(); // 오류. object에 toFixed 존재하지않음.
// - 타입의 일부만 아는 경우에 유용 (여러 타입이 섞인 배열 등)
var list3 = [1, true, "free"];
list3[1] = "zz";
// 8) Void
// - Any의 반대 타입. 어떤 타입도 존재할 수 없음.
function warnUser() {
    console.log("This is my warning message");
}
// - Void 타입에는 null 혹은 undefined 만 할당 가능
var unusable = undefined;
unusable = null; // `--strictNullChecks` 사용 안할 때만 성공
// 9) Null and Undefined
// - 각각의 타입이름도 값과 같은 null, undefined
var u = undefined;
var n = null;
// - Null과 Undefined는 모든 타입의 하위 타입이다. => 다른 모든 타입에 할당 가능
// - `--strictNullChecks`를 사용하면
//      1) null 과 undefined 자신에게 할당 혹은 any에 할당 가능
//      2) undefined는 void에 할당 가능.
//      3) 유니언 타입 사용하여 다른 타입에 할당 가능 => 예) string | null | undefined
// 10) Never
// - 절대 발생할 수 없는 타입 ?
// never를 반환하는 함수는 함수의 마지막에 도달 x
// 에러 발생이나 무한 루프 등
function error(message) {
    throw new Error(message);
}
function fail() {
    return error("Something failed");
}
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 });
create(null);
// create(42);
// create("string");
// create(false);
// create(undefined);
// 12) Type assertions
// - 어떤 엔티티의 타입을 더 구체적으로 알고 있을 때 발생
// - 다른 언어의 형변환과 유사
// - 다른 언어와 다른 점은 런타임에 영향 x, 컴파일러만 사용
// - angle-bracket 문법 / as 문법
// - typescript와 JSX를 같이 사용시에는 as 문법만 허용
// angle-bracket 문법
var someValue1 = "this is a string";
var strLength1 = someValue1.length;
// as 문법
var someValue2 = "this is a string";
var strLength2 = someValue1.length;
