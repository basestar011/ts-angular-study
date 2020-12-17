// - 유니언 타입은 여러 타입 중 하나가 될 수 있는 값을 의미

// - number나 string이 매개변수인 함수 사용할 때

/**
 * 문자열을 받고 왼쪽에 padding을 추가
 * 만약 padding이 문자열이면 padding은 왼쪽에 더해진다.
 * 만약 padding이 숫자면 그 숫자만큼 공백이 왼쪽에 더해진다.
 */

// 예 (1)
function padLeft(value : string, padding : any) {
    if(typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }

    if(typeof padding === "string") {
        return padding + value;
    }

    throw new Error(`Expected string or number, got '${padding}'`);
}

padLeft("Hello world", 4);
padLeft("Hello world", "Hi ");
padLeft("Hello world", {});


// 예 (2)
declare function padLeft2(value : string, padding : any) : string;
// -- 생략
// 컴파일에서는 통과하지만 런타임 시 오류 발생
let indentedString = padLeft2("Hello World", true);

// padding 타입을 any 대신에 유니언 타입을 사용
function padLeft3(value : string, padding : string | number) {
    // ...
}
// let indentedString2 = padLeft3("Hello world", true);



// 공통 필드를 갖는 유니언
interface Bird {
    fly() : void;
    layEggs() : void;
}

interface Fish {
    swim() : void;
    layEggs() : void;
}

declare function getSmallPet() : Bird | Fish;

let pet = getSmallPet();
pet.layEggs();
// 두개의 타입 중 하나에서만 사용 가능.
// pet.swim();

// A | B 타입으로 정의 됐다면 A와 B가 공통으로 가지고 있는 멤버를 가지고 있다
// 그렇지 않은 멤버는 확신할 수 없음



// 유니언 구별하기
type NetworkLoadingState = {
    state : "loading";
}

type NetworkFailedState = {
    state : "failed";
    code : number;
}

type NetworkSuccessState = {
    state : "success";
    response : {
        title : string;
        duration : number;
        summary : string;
    };
}

// 하나를 대표하는 타입을 만들었지만 무슨 타입인지 확실하지 않다.
type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState;

function networkStatus(state: NetworkState): string {
    // 모든 타입의 공통이 아닌 프로퍼티에 접근하려는 시도는 오류를 발생 시킨다.
    // state.code;

    switch (state.state) {
        case "loading" :
            return "Downloading...";
        case "failed" :
            return `Error ${state.code} downloading`;
        case "success" :
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
}
