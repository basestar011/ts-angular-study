// 교차 타입은 여러 타입을 하나로 결합한다
// 기존 타입이 합쳐지고 필요한 기능을 모두 가진 단일 타입
const handleArtistsResponse = (response) => {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};
// 교차를 통한 믹스인
// - 믹스인 패턴을 위해 사용됨
class Person {
    constructor(name) {
        this.name = name;
    }
}
class ConsoleLogger {
    log(name) {
        console.log(`Hello, I'm ${name}.`);
    }
}
// 두 객체를 받아 하나로 합친다
function extend(first, second) {
    const result = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            result[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            result[prop] = second[prop];
        }
    }
    return result;
}
const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);
