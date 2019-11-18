
export type Curry4<A, B, C, D, R> = {
    (a: A, b: B, c: C, d: D): R;
    (a: A, b: B, c: C): Curry1<D, R>;
    (a: A, b: B): Curry2<C, D, R>;
    (a: A): Curry3<B, C, D, R>;
};

export type Curry3<A, B, C, R> = {
    (a: A, b: B, c: C): R;
    (a: A, b: B): Curry1<C, R>;
    (a: A): Curry2<B, C, R>
};

export type Curry2<A, B, R> = {
    (a: A, b: B): R;
    (a: A): Curry1<B, R>;
};

export type Curry1<A, R> = (a: A) => R;


export type VariadicCurry<T, R> =
    T extends [any, any, any, any] ? Curry4<T[0], T[1], T[2], T[3], R> :
    T extends [any, any, any] ? Curry3<T[0], T[1], T[2], R> :
    T extends [any, any] ? Curry2<T[0], T[1], R> :
    T extends [any] ? Curry1<T[0], R> :
    unknown
    ;

export function n_curry<T extends any[], R>
    (fn: (...args: T) => R): VariadicCurry<T, R>;

export function n_curry(fn:any) {
    const argN = fn.length;
    return function (...args:any[]) {
        if (args.length < argN) {
            return n_curry(fn.bind(null, ...args));
        } else {
            return fn.call(null, ...args);
        }
    }
}


export function curry<T extends any[],R>(fn: (...args: T) => R, ...args:T): VariadicCurry<T, R>{
    let a = n_curry(fn);
    return (a as any)(...args) as  VariadicCurry<T, R>;
}

// export function curry<T extends any[],R>(fn: (...args: T) => R, ...args:T): VariadicCurry<T, R>{
//     let a = (n_curry as any)(fn(...args));
//     return a as VariadicCurry<T, R>;
// }


//my curry
// function curry<T extends Function>(fn:T){
//     let fnLength=fn.length;
//     let argsArr =[];
//     function recursion(arg){
//        argsArr.push(arg);
//        fnLength--;
//        if(fnLength ==0){
//          return fn.call(fn,...argsArr);
//        }
//        else{
//          return recursion;
//      }
//    }
//     return recursion;    
//   }