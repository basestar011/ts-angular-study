// 이름이 있는 상수들의 집합을 정의 가능
// 타입 스크립트는 숫자와 문자열 기반 enums을 제공

// 1) 숫자 enums

// 예 (1)
// 숫자 열거형 선언시
// 그 다음 멤버들은 자동으로 증가된 값을 가짐
enum Direction1 {
    Up = 1,
    Down, // 2
    Left, // 3
    Right, // 4
}

// 예 (2)
// 초기화 하지 않을 수도 있다
enum Direction2 {
    Up, // 0
    Down, // 1
    Left, // 2
    Right, // 3
}

// 예 (3)
// enum 사용 방식은 enum의 프로퍼티로 접근
enum Response2 {
    No = 0,
    Yes = 1,
}

function respond(recipient : string, message : Response2) : void {
    // ...
}

respond("Princess Caroline", Response2.Yes);

// 예 (4)
// 숫자 enum은 계산 멤버와 상수 멤버를 섞어서 사용 가능
// 섞어서 사용 시에는
// - 초기화 되지 않은 멤버를 먼저 쓰거나
// - 숫자 상수, 상수 열거형 멤버와 함께 초기화된 숫자 열거형 이후에 와야함
/*
enum E {
    A = getSomeValue(),
    B, // 오류 : 계산된 멤버 뒤에는 초기화가 반드시 필요
}
*/



// 2) 문자열 enum

// - 숫자형 처럼 자동 증가 기능 x
// - 직렬화 이점 -> 유의미하고 읽기 좋은 값을 이용 가능하기 때문
enum Direction3 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}



// 3) 이종 enum
// - 문자열과 숫자를 섞어서 사용하는 enum
// - 사용하지 않는 것을 권장
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}



// 4) 계산된 멤버와 상수 멤버

// 예 (1)
// - 초기화 값이 없는 경우 0으로 할당
enum E { X }
console.log(E.X); // 0

// 예 (2)
// - 초기화 값이 없고, 숫자 상수로 초기화 된 멤버 뒤 멤버의 값은 
//   앞의 상수 값에 1 증가한 값을 가짐
enum E1 {
    X, // 0
    Y, // 1
    Z, // 2
}
enum E2 {
    A = 1,
    B, // 2
    C, // 3
}


/**
 * 상수 열거형 표현식
 * 
 * 1. 리터럴 열거형 표현식 (기본적으로 문자 리터럴 또는 숫자 리터럴)
 * 2. 이전에 정의된 다른 상수 열거형 멤버에 대한 참조 (다른 열거형에서 시작될 수 있음)
 * 3. 괄호로 묶인 상수 열거형 표현식
 * 4. 상수 열거형 표현식에 단항 연산자 +, -, ~ 를 사용한 경우
 * 5. 상수 열거형 표현식을 이중 연산자 +, -, *, /, %, <<, >>, >>>, &, |, ^ 의 피연산자로 사용할 경우
 * 
 * - 표현식 값이 NaN, Infinity 면 컴파일 에러
 * - 위의 경우에 해당하지 않는 것은 계산된 것으로 판단
 */

enum FileAccess {
    // 상수 멤버
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite  = Read | Write,
    // 계산된 멤버
    G = "123".length
}



// 5) 유니언 enum, enum 멤버 타입

// - 리터럴 enum 멤버 : 상수 enum 의 특수한 부분집합
// - 초기화 값이 다음과 같은 경우
// >> 문자 리터럴("foo", "bar, "baz"),
// >> 숫자 리터럴(1, 100)
// >> 숫자 리터럴에 단항 연산자 -가 적용된 경우 (-1, -100)

// - 이러한 경우 enum 멤버를 타입처럼 사용 가능
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind : ShapeKind.Circle;
    radius : number;
}

interface Square {
    kind : ShapeKind.Square;
    sideLength : number;
}

let d : Circle = {
    // kind: ShapeKind.Square, // 오류
    kind : ShapeKind.Circle,
    radius: 100,
}

// - enum 자체의 타입이 각각 enum 멤버의 유니언 타입이 됨
enum E3 {
    Foo,
    Bar,
}

function f2(x : E3) {
    // E3에는 Foo와 Bar 밖에 없기 때문에
    // 다음의 if문은 항상 true만 리턴
    /*
    if (x !== E3.Foo || x !== E3.Bar) {
        // 에러 : E 타입은 Foo, Bar 둘 중 하나이기 때문에 이 조건은 항상 true를 반환
    }
    */
}



// 6) 런타임 시 enum
// - enum은 런타임 시에 실제 객체로 존재
enum E4 {
    X, Y, Z
}

function f3(obj : { X : number }) {
    return obj.X;
}

// E가 X라는 숫자 프로퍼티를 가지고 있기 때문에 동작하는 코드
f3(E4);



// 7) 컴파일 시 enum
// - enum 객체에게 keyof typeof 키워드를 사용하면
//   enum 객체의 모든 키를 문자열로 나타내는 타입을 가져옴
enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key : LogLevelStrings, message : string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log('Log level key is: ', key);
        console.log('Log level value is: ', num);
        console.log('Log level message is: ', message);
    }
}
printImportant('ERROR', 'This is a message');



// 8) 역 매핑
// - 숫자 enum 에서만 해당
// - 정방향(name -> value) 매핑과 역방향(value -> name) 매핑이 동시에 이루어짐
enum Enum2 {
    A
}
let a2 = Enum2.A;
let nameOfA = Enum2[a2]; // "A"



// 9) const enum
// - 상수 enum 표현식만 사용 가능
// - 계산된 멤버를 가질 수 없다

// 예 (1)
const enum Enum3 {
    A = 1,
    B = A * 2
}

// 예 (2)
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// 컴파일 시
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];



// 10) Ambient enum
// - 이미 존재하는 enum 타입을 나타내기 위해 사용
declare enum Enum {
    A = 1,
    B,
    C = 2
}
// - 일반적인 enum에서는 B를 상수로 간주하겠지만
//   ambient enum에서는 B를 계산된 멤버로 간주