

//**Making an applicative functor */

class ApplicativeArray<T extends (...args: any) => any> extends Array<T>{
    private constructor(...args: T[]) {
        super(...args);
    }
 
    static of<T>(...items: T[]): ApplicativeArray<T> {
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
    ap<R extends Parameters<T>, G>(xs: R[]) {
        return this.reduce((acc: G[], currentFn: T) => acc.concat(xs.map(currentFn)), [])
    }

};

let appArray = ApplicativeArray.of<(a: number) => number>(a => 2 + a);
let someArr = appArray.ap([3, 4, 4]);
console.log(someArr);

let next = ApplicativeArray.of(1, 2, 3);
;

// let someA = [1,2,3].concat([1]);
// console.log(someA);





