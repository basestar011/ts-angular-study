// Generic으로 여러 타입의 컴포넌트나 자신만의 타입을 사용 가능

// 1) identity 함수
function identity1(arg : any) : any {
    return arg;
}
// generic을 사용하는 대신에 any를 사용하면
// 실제 사용 시 리턴 타입의 정보를 알 수 없다

// 타입 변수 사용
function identity2<T>(arg : T) : T {
    return arg;
}

// 호출 방법
// (1) 타입 인수 포함 모든 인수 전달
let output1 = identity2<string>("myString");
// (2) 타입 인수 추론
// - 전달하는 인수에 따라서 컴파일러가 T의 값을 정하게 함
let output2 = identity2("myString");



// 2) generic 타입 변수 작업
// - generic 타입 변수 T를 사용하여 유연함을 제공
function identity<T>(arg : T) : T {
    return arg;
}

function loggingIdentity1<T>(arg : T) : T {
    // console.log(arg.length); // 오류 : T에는 .length 가 없다
    return arg;
}

function loggingIdentity2<T>(arg : T[]) : T[] {
    console.log(arg.length); // 배열은 .length를 가지고 있다
    return arg;
}



// 3) generic 타입 & generic 인터페이스
function identity3<T>(arg : T) : T {
    return arg;
}

// - generic 함수의 타입
let myIdentity1 : <T>(arg : T) => T = identity3;

// - 객체 리터럴 타입의 generic 타입
let myIdentity2 : { <T>(arg : T) : T } = identity3;

// generic 인터페이스 예 (1)
// - 위의 객체 리터럴 타입을 인터페이스로
interface GenericIdentityFn {
    <T>(arg : T) : T;
}

function identity4<T>(arg : T) : T {
    return arg;
}

let myIdentity3 : GenericIdentityFn = identity4;

// generic 인터페이스 예 (2)
// - generic 매개변수를 전체 인터페이스의 매개변수로 옮기기
// 이 경우 generic 타입을 확인할 수 있음
interface GenericIdentityFn2<T> {
    (arg : T) : T;
}

function identity5<T>(arg : T) : T {
    return arg;
}

let myIdentity4 : GenericIdentityFn2<number> = identity5;



// 4) generic 클래스
// - generic 인터페이스와 형태가 유사
// - generic 클래스는 인스턴스 측면에서만 generic이므로
//   static 멤버에는 클래스의 타입 매개변수 사용 불가
class GenericNumber<T> {
    zeroValue : T;
    add : (x : T, y : T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };



// 5) generic 제약조건
interface Lengthwise {
    length : number;
}

function loggingIdentity<T extends Lengthwise>(arg : T): T {
    console.log(arg.length); // length 프로퍼티가 있으니 오류 x
    return arg;
}

// loggingIdentity(3);  // 오류 : number는 length 프로퍼티가 없음
loggingIdentity({length: 10, value: 3});



// 6) generic 제약조건에 타입 매개변수 사용
function getProperty<T, K extends keyof T>(obj : T, key : K) {
    return obj[key];
}

let o = { a: 1, b: 2, c: 3, d: 4 };

getProperty(o, "a"); // 성공
// getProperty(o, "m"); // 오류: 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음



// 6) generic에서 클래스 타입 사용
function create2<T>(c : {new() : T; }) : T {
    return new c();
}

// 고급 예제
class BeeKeeper {
    hasMask : boolean;
}

class ZooKeeper {
    nametag : string;
}

class Animal9 {
    numLegs : number;
}

class Bee extends Animal9 {
    keeper : BeeKeeper;
}

class Lion extends Animal9 {
    keeper : ZooKeeper;
}

function createInstance<A extends Animal9>(c : new () => A) : A {
    return new c();
}

createInstance(Lion).keeper.nametag; // 타입검사
createInstance(Bee).keeper.hasMask; // 타입검사