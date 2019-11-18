
// po zazanczeniu opcji "strictBindCallApply": true w tsconfig to bedzie dobrze rozwiazywane
function printConsole(value: string) {
    console.log('value is ', value);
}

let me = printConsole.call(null, 'some tekst');

//przyklad tuppli

type MyTuple = [string, number, boolean];

// przyklad jak dobrac sie do typu funkcji
function foo(foo: string, y?: number, ...rest: boolean[]): string {
    return `String is ${foo} and number ${y} and first boolean ${rest?.[0]}`
}

//jesli podswietlisz to ,to pojawi sie tupla z parametrami
function callSome<A extends any[], R>(fn: (...args: A) => R, ...args: A) {
    return fn(...args);
}

let meTo = callSome(foo,'kot',10,false);
console.log(meTo);