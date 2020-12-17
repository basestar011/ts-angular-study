// 타입 스크립트에서는 표준 자바스크립트 함수에 몇가지 새로운 기능이 추가됨
// 1) 함수 선언 및 기본 개념
// - 선언 방식
// - named function / anonymous function
// - 자바스크립트 방식
//   named function
function add(x, y) {
    return x + y;
}
//   anonymous function
var myAdd = function (x, y) { return x + y; };
// - 함수 외부의 변수 참조 가능
var z = 100;
function addToZ(x, y) {
    return x + y + z;
}
// 2) 함수 타입
// - 각 파라미터와 리턴 타입을 정할 수 있다
// - 리턴 타입은 내부 return 문으로 리턴 타입을 파악할 수 있어 생략 가능
// - 함수가 리턴 값이 없다면 비워두는 대신 void로 표시
// - 위의 예시에 타입을 추가
function add2(x, y) {
    return x + y;
}
var myAdd2 = function (x, y) { return x + y; };
// - 화살표 표기를 사용하여 표현하는 방식
var myAdd3 = function (x, y) { return x + y; };
// 3) 타입의 추론
// - 컴파일러는 한 쪽에만 타입이 있어도 타입을 알아낼 수 있다
var myAdd4 = function (x, y) { return x + y; };
var myAdd5 = function (x, y) { return x + y; };
// 4) 선택적 매개변수 / 기본 매개변수
// - [기본 매개변수]
// - 함수가 호출될 때 각 매개변수에 값을 주었는지 검사
// - 함수에 주어진 인자 수 = 함수에 정의된 매개변수의 수
function buildName(firstName, lastName) {
    return firstName + " " + lastName;
}
// let result1 = buildName("Bob"); // 오류
// let result2 = buildName("Bob", "Adams", "Sr."); // 오류
var result3 = buildName("Bob", "Adams"); // 정확함
// - [선택적 매개변수]
// - 매개변수 이름 끝에 '?' 를 붙임
function buildName2(firstName, lastName) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
var result1 = buildName2("Bob"); // 정확함
// let result2 = buildName2("Bob", "Adams", "Sr."); // 오류
var result4 = buildName2("Bob", "Adams"); // 정확함
// - 기본-초기화 매개변수
// - 값이 제공되지 않았거나 undefined 일 때 할당됨
function buildName3(firstName, lastName) {
    if (lastName === void 0) { lastName = "Smith"; }
    return firstName + " " + lastName;
}
var result5 = buildName3("Bob");
var result6 = buildName3("Bob", undefined); // Bob Smith 리턴
// let result7 = buildName3("Bob", "Adams", "Sr."); // 오류
var result8 = buildName3("Bob", "Adams"); // 정확함
// - 선택적 매개변수와 기본-초기화 매개변수가 필수 매개변수의 뒤에 올 때는 생략하면 알아서 처리됨
// - 그 반대의 경우에는 undefined를 명시적으로 전달해야 함
function buildName4(firstName, lastName) {
    if (firstName === void 0) { firstName = "Will"; }
    return firstName + " " + lastName;
}
// let result8 = buildName4("Bob"); // 오류
// let result9 = buildName4("Bob", "Adams", "Sr."); // 오류
var result10 = buildName4("Bob", "Adams"); // Bob Adams 리턴
var result11 = buildName4(undefined, "Adams"); // Will Adams 리턴
// 5) 나머지(Rest) 매개변수
// - 한 번에 하나의 매개변수가 아닌 다수의 매개변수를 그룹지을 때
// - 자바스크립트의 경우에는 arguments 변수 사용
// - 타입스크립트에서는 매개변수의 이름 앞에 '...'를 붙임
function buildName5(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName5("Joseph", "Samuel", "Lucas", "MacKinzie");
// 6) this
// - this / 화살표 함수
// - this는 함수가 호출될 때 정해지는 변수
// - 함수가 실행되는 콘텍스트와 밀접
// 오류 예제)
// let deck = {
//     suits : ["hearts", "spades", "clubs", "diamonds"],
//     cards : Array(52),
//     createCardPicker : function() {
//         return function() {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);
//             return {suit : this.suits[pickedSuit], card : pickedCard % 13};
//         }
//     }
// }
// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();
// alert("card: " + pickedCard.card + " of " + pickedCard.suit); // 오류
// 화살표 함수를 사용한 예제
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
// 7) this 매개변수
// - 명시적으로 this를 정하고자 할 때 사용
// - 함수의 매개변수 목록에서 가장 먼저 나오는 가짜 매개변수
function f() {
    // 독립형 함수에서 `this`를 사용할 수 없다.
}
var deck2 = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker2 = deck.createCardPicker();
var pickedCard2 = cardPicker();
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
// 잘못된 예제
// class Handler {
//     info : string;
//     onClickBad(this : Handler, e : Event) {
//         this.info = e.message;
//     }
// }
// let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // 오류
// 올바른 예제 (1)
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.onClickGood = function (e) {
        console.log('clicked!');
    };
    return Handler;
}());
// 올바른 예제 (2)
// class Handler {
//     info : string;
//     onClickGood = (e : Event) => { this.info = e.message }
// }
var h = new Handler();
// uiElement.addClickListener(h.onClickGood);
// 9) 오버로드
// - 전달된 인자의 형태에 따라 다른 리턴 방식을 정해줄 때
// - [javascript] 방식
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    if (typeof x == "object") {
        var pickedCard_1 = Math.floor(Math.random() * x.length);
        return pickedCard_1;
    }
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard3 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard3.card + " of " + pickedCard3.suit);
var pickedCard4 = pickCard(15);
alert("card: " + pickedCard4.card + " of " + pickedCard4.suit);
//----------------------------------------------------------------
// - [typescript] 방식
var suits2 = ["hearts", "spades", "clubs", "diamonds"];
function pickCard2(x) {
    if (typeof x == "object") {
        var pickedCard_2 = Math.floor(Math.random() * x.length);
        return pickedCard_2;
    }
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits2[pickedSuit], card: x % 13 };
    }
}
var myDeck2 = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard5 = myDeck2[pickCard2(myDeck2)];
alert("card: " + pickedCard5.card + " of " + pickedCard5.suit);
var pickedCard6 = pickCard(15);
alert("card: " + pickedCard6.card + " of " + pickedCard6.suit);
