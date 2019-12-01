

//**Making an applicative functor */
//** tutaj trick bierzemy parametry od naszej funkcji wsadowej i typem parameters zwracamy typ z tupli z indeksem 1 */
class ApplicativeArray<T extends (arg: any) => any,B extends Parameters<T>[0]> extends Array<T>{
    private constructor(...args: T[]) {
        super(...args);
    }

    static create<Z extends (arg: any) => any>(...items: Z[]): ApplicativeArray<Z,Parameters<Z>[0]> {
        let ret = Object.create(ApplicativeArray.prototype);
        ret.push(...items);
        return ret;
    }

    head() {
        return this[0];
    }
    tail() {
        return this[this.length - 1];
    }
    ap<R extends ReturnType<T>>(xs: B[]) {
        return this.reduce((acc: R[], currentFn: T) => acc.concat(xs.map(currentFn)), [])
    }

};

let appArray = ApplicativeArray.create<(a: number) => number>(a => 2 + a);
let someArr = appArray.ap([3, 4, 4]);
console.log(someArr);



// let someA = [1,2,3].concat([1]);
// console.log(someA);





