// 타입스크립트의 데이터 타입 : 자바스크립트와 거의 동일한 데이터 타입 지원

// 데이터 타입 종류

// 1) Boolean

let isDone : boolean = false;



// 2) Number

let decimal : number = 6;
let hex : number = 0xf00d;
let binary : number = 0b1010;
let octal : number = 0o744;



// 3) String

let color : string = "blue";
color = 'red';

// - 템플릿 문자열 사용
let fullName : string = `Bob Bobbington`;
let age : number = 37;
let sentence1 : string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month.`;

// - 일반 문자열 사용
let sentence2 : string = "Hello, my name is " + fullName + ".\n\n" + "I'll be " + (age + 1) + " years old next month.";



// 4) Array

// - 배열 타입 뒤에 [] 사용
let list1 : number[] = [1, 2, 3];

// - 제네릭 배열 타입 사용
let list2 : Array<number> = [1, 2, 3];



// 5) Tuple - 크기와 각 요소의 타입을 고정한 배열을 표현

// tuple 타입으로 선언
let x : [string, number];
// 값 초기화
x = ["hello", 10];
// 잘못된 초기화
// x = [10, "hello"];

console.log(x[0].substring(1)); // 성공
//console.log(x[1].substring(1)); // 오류
// x[3] = "wolrd"; // 오류
// console.log(x[5].toString()); // 오류



// 6) Enum

enum Color1 {Red, Green, Blue}
let c1 : Color1 = Color1.Red;

// - 기본적으로 enum의 인덱스는 0부터 시작
// - 인덱스를 임의로 설정할 수 있음

enum Color2 {Red = 1, Green, Blue}
let c2 : Color2 = Color2.Green;

enum Color3 {Red = 1, Green = 2, Blue = 4}
let c3 : Color3 = Color3.Blue;

// 인덱스 값으로 해당 enum 값을 얻을 수도 있음
enum Color4 {Red = 2, Green, Blue}
let colorName : string = Color4[3];
console.log(colorName); // Green



// 7) Any

// - 알지 못하는 타입. 임의의 타입, 컴파일 통과
let notSure1 : any = 4;
notSure1 = "maybe a string instead";
notSure1 = false;

let notSure2 : any = 4;
notSure2.ifItExist(); // 성공
notSure2.toFixed(); // 성공

let prettySure : Object = 4;
// prettySure.toFixed(); // 오류. object에 toFixed 존재하지않음.

// - 타입의 일부만 아는 경우에 유용 (여러 타입이 섞인 배열 등)
let list3 : any[] = [1, true, "free"];
list3[1] = "zz";



// 8) Void

// - Any의 반대 타입. 어떤 타입도 존재할 수 없음.
function warnUser() : void {
    console.log("This is my warning message");
}

// - Void 타입에는 null 혹은 undefined 만 할당 가능
let unusable : void = undefined;
unusable = null; // `--strictNullChecks` 사용 안할 때만 성공



// 9) Null and Undefined

// - 각각의 타입이름도 값과 같은 null, undefined
let u : undefined = undefined;
let n : null = null;

// - Null과 Undefined는 모든 타입의 하위 타입이다. => 다른 모든 타입에 할당 가능
// - `--strictNullChecks`를 사용하면
//      1) null 과 undefined 자신에게 할당 혹은 any에 할당 가능
//      2) undefined는 void에 할당 가능.
//      3) 유니언 타입 사용하여 다른 타입에 할당 가능 => 예) string | null | undefined



// 10) Never

// - 절대 발생할 수 없는 타입 ?

// never를 반환하는 함수는 함수의 마지막에 도달 x
// 에러 발생이나 무한 루프 등
function error(message:string) : never {
    throw new Error(message);
}

function fail() {
    return error("Something failed");
}

function infiniteLoop() : never {
    while(true) {

    }
}

// never는 모든 타입에 할당 가능한 하위 타입.
// 하지만 never에는 어떤 타입도 할당 할 수 없다. any또한 할당 불가



// 11) Object

// - premitive 타입이 아닌 타입.
// - number, string, boolean, bigint, symbol, null, undefined 가 아닌 나머지

declare function create(o: object | null) : void;

create({ prop : 0 });
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
let someValue1 : any = "this is a string";
let strLength1 : number = (<string>someValue1).length;

// as 문법
let someValue2 : any = "this is a string";
let strLength2 : number = (someValue1 as string).length;