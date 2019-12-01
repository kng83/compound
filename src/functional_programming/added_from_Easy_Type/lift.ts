

//**Making an applicative functor */

class ApplicativeArray<T> extends Array<T>{

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
    // Apply elements to functional array
    ap< G >(xs: G[]) {
        return this.reduce((acc:G[], currentFn:T) => acc.concat(xs.map(currentFn)), []) as {(arg:G):T}[]
    }

};

let appArray = ApplicativeArray.of<(a: number) => number>(a => 2 + a);
let someArr = appArray.ap(['8',4,4]);
console.log(someArr);f

let next = ApplicativeArray.of(1,2,3);
;

// let someA = [1,2,3].concat([1]);
// console.log(someA);


