// 교차 타입은 여러 타입을 하나로 결합한다
// 기존 타입이 합쳐지고 필요한 기능을 모두 가진 단일 타입

// 예
interface ErrorHandling {
    success : boolean;
    error? : { message : string };
}

interface ArtworksData {
    artworks : { title : string }[];
}

interface ArtistsData {
    artists : { name : string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response : ArtistsResponse) => {
    if(response.error) {
        console.error(response.error.message);
        return;
    }

    console.log(response.artists);
}



// 교차를 통한 믹스인
// - 믹스인 패턴을 위해 사용됨

class Person {
    constructor(public name : string) {}
}

interface Loggable {
    log(name : string) : void;
}

class ConsoleLogger implements Loggable {
    log(name : string) {
        console.log(`Hello, I'm ${name}.`);
    }
}

// 두 객체를 받아 하나로 합친다
function extend<First extends {}, Second extends {}>(
    first : First,
    second : Second
) : First & Second {
    const result : Partial<First & Second> = {};
    for(const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);