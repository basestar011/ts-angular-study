// Literal Type
// - string
// - number

// 1) 리터럴 타입 좁히기

// const를 사용하여 변수 helloWorld가 절대 변경되지 않음을 보장
// 따라서, TypeScript는 문자열이 아닌 "Hello World"로 타입을 정한다.
const helloWorld = "Hello World";

// 반면, let은 변경될 수 있으므로 컴파일러는 문자열이라고 선언
let hiWorld = "hi World";



// 2) 문자열 리터럴 타입

// - 유니언 타입 / 타입 가드 / 타입 별칭과 잘 결합됨.

type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
    animate(dx : number, dy : number, easing : Easing) {
        if(easing === "ease-in") {
            // ...
        } else if(easing === "ease-out") {
            // ...
        } else if(easing === "ease-in-out") {
            // ...
        } else {
            // ...
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");
// '"uneasy"' 타입은 '"ease-in" | "ease-out" | "ease-in-out"' 타입의 매개 변수에 할당할 수 없습니다.
// 오류 발생

// - 문자열 리터럴 타입은 오버로드를 구별하는 것과 동일한 방법으로 사용할 수 있음
/*
function createElement(tagName : "img") : HTMLImageElement;
function createElement(tagName : "input") : HTMLImageElement;
// 추가 적인 중복 정의들...
function createElement(tagName : string) : Element {
    // ... 로직 추가
}
*/



// 3) 숫자형 리터럴 타입

// - 문자열 리터럴 타입과 동일한 역할
// - 예 (1)
function rollDice() : 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2| 3 | 4 | 5 | 6;
}

const result = rollDice();

// - 예 (2)
declare function setupMap(config : MapConfig) : void;

interface MapConfig {
    lng : number;
    lat : number;
    tileSize : 8 | 16 | 32;
}

setupMap({ lng : -73.935242, lat : 40.73061, tileSize : 16 });

