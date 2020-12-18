// 자바 스크립트에서는 함수와 프로토타입 기반 상속을 사용
// 타입 스크립트에서는 객체 지향적, 클래스 기반의 접근 방식을 사용할 수 있음


// 1) 클래스
class Greeter {
    greeting : string;
    constructor(message : string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");



// 2) 상속
// - 객체 지향 패턴을 사용하여
//   상속을 통해 기존의 클래를 확장하여 새로운 클래스를 만들 수 있음

// 예 (1)
// 상위 클래스
class Animal2 {
    move(distanceInMeters : number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

// 히위 클래스
class Dog2 extends Animal2 {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog2();
dog.bark();
dog.move(10);
dog.bark();


// 예 (2)
class Animal3 {
    name : string;
    constructor(theName : string) { this.name = theName; }
    move(distanceInMeters : number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal3 {
    constructor(name : string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal3 {
    constructor(name : string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom : Animal3 = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);



// 3) Public, Private, Protected 지정자
// - 명시되지 않은 경우에는 default = public
// - 명시적으로 public 을 표시해도 상관없음
class Animal4 {
    public name : string;
    public constructor(theName : string) { this.name = theName; }
    public move(distanceInMeters : number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}


// private 필드를 위한 문법 (TypeScript 3.8부터 지원)
// #(필드명)
class Animal5 {
    #name : string;
    constructor(theName : string) { this.#name = theName; }
}

// private 이해하기 예제
class Animal6 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

// new Animal6("Cat").name; // 오류: 'name'은 비공개로 선언되어 있습니다;


// 두 개의 다른 타입을 비교할 때
// private, protected 멤버가 있는 타입들을 비교한다면
// 모두 동일하게 선언되어 있어야 호환 가능하다고 판단
class Animal7 {
    private name : string;
    constructor(theName : string) { this.name = theName; }
}

class Rhino extends Animal7 {
    constructor() { super("Rhino"); }
}

class Employee {
    private name : string;
    constructor(theName : string) { this.name = theName; }
}

let animal = new Animal7("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee; // 오류: 'Animal'과 'Employee'은 호환될 수 없음
// animal과 rhino는 같은 Animal7에서 선언된 private한 멤버가 있지만,
// employee는 Employee에서 선언한 private한 멤버가 있기 떄문에 호환 불가능


// protected 이해하기 예제 (1)
class Person2 {
    protected name : string;
    constructor(name : string) { this.name = name; }
}

class Employee2 extends Person2 {
    private department : string;

    constructor(name : string, department : string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 오류 : 외부에서는 name에 접근 불가능

// protected 이해하기 예제 (2)
// - 상위 클래스의 생성자가 protected
class Person3 {
    protected name : string;
    protected constructor(theName : string) { this.name = theName; }
}

class Employee3 extends Person3 {
    private department : string;

    constructor(name : string, department : string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard2 = new Employee3("Howard", "Sales");
// let john = new Person3("John"); // 오류 : 'Person'의 생성자가 protected



// 4) Readonly 지정자
// - 선언 또는 생성자에서 초기화만 가능

class Octopus {
    readonly name : string;
    readonly numberOfLegs : number = 8;
    constructor(theName : string) { this.name = theName; }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 오류



// 4) Parameter 프로퍼티
// 위의 Octopus 클래스에서 name 이라는 멤버와 theName이라는 생성자의 parameter가 있었다.
// name은 생성자가 수행된 후에 theName이라는 값에 접근하기 위해 필요한 멤버.
// 이것을 한번에 수행하는 것이 parameter 프로퍼티

// parameter 프로퍼티는 접근지정자(public, private, protected)나 readonly
// 또는 둘 다를 접두어로 생성자의 parameter를 선언하여 사용가능
class Octopus2 {
    readonly numberOfLegs : number = 8;
    constructor(readonly name : string) {
    }
}



// 5) 접근자
// - 컴파일 시 ES5 이상 설정
// - getters / setters

// getters, setters가 없는 예제
class Employee4 {
    fullName : string;
}

let employee4 = new Employee4();
employee4.fullName = "Bob Smith";
if (employee4.fullName) {
    console.log(employee4.fullName);
}

// getters, setters가 있는 예제
// fullname이 설정될 때 제약조건을 적용
const fullNameMaxLength = 10;

class Employee5 {
    private _fullName : string;

    get fullName() : string {
        return this._fullName;
    }

    set fullName(newName : string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

let employee5 = new Employee5();
employee5.fullName = "Bob Smith";
if (employee5.fullName) {
    console.log(employee5.fullName);
}



// 6) static 프로퍼티
// - 인스턴스의 멤버가 아닌 클래스 자체의 전역 멤버 생성
class Grid {
    static origin = {x : 0, y : 0};
    calculateDistanceFromOrigin(point : { x : number; y : number; }) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale : number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x : 10, y : 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x : 10, y : 10 }));



// 7) 추상 클래스
// - 직접 인스턴스화 불가
// - 멤버에 대한 구현 가능
// - 추상 클래스 뿐만 아니라 추상 클래스 내의 추상 메서드를 정의하는데도 사용
// - 추상 메서드는 구현을 포함하지 않고 반드시 하위 클래스에서 구현되어야 함
// - interface와 비슷하지만 abstract 키워드를 반드시 포함해야 함
abstract class Animal8 {
    abstract makeSound() : void;
    move() : void {
        console.log("roaming the earth...");
    }
}

// 예
abstract class Department {

    constructor(public name : string) {}

    printName() : void {
        console.log("Department name : " + this.name);
    }

    abstract printMeeting() : void;
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // 하위 클래스의 생성자는 반드시 super()를 호출해야 함
    }

    printMeeting() : void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports() : void {
        console.log("Generating accounting reports...");
    }
}

let department : Department; // 추상 클래스 타입으로 생성
// department = new Department(); // 오류
department = new AccountingDepartment();
department.printName();
department.printMeeting();
// department.generateReports(); // 오류 : 해당 메서드는 추상 클래스에 선언된 적이 없음



// 8) 생성자 함수
// 예 (1)
class Greeter2 {
    greeting : string;
    constructor(message : string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter2 : Greeter2;
greeter2 = new Greeter2("world");
console.log(greeter2.greet());

// 예 (2) - 자바스크립트 방식
let Greeter3 = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter3;
greeter3 = new Greeter3("world");
console.log(greeter3.greet());

// 예 (3)
class Greeter4 {
    static standardGreeting = "Hello, there";
    greeting : string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter4.standardGreeting;
        }
    }
}

let greeter4 : Greeter4;
greeter4 = new Greeter4();
console.log(greeter4.greet()); // Hello, there

let greeterMaker : typeof Greeter4 = Greeter4;
greeterMaker.standardGreeting = "Hey there!";

let greeter5: Greeter4 = new greeterMaker();
console.log(greeter5.greet()); // Hey there!



// 9) 인터페이스로써 클래스 사용하기
class Point2 {
    x : number;
    y : number;
}

interface Point3d extends Point2 {
    z : number;
}

let point3d : Point3d = {x: 1, y: 2, z: 3};