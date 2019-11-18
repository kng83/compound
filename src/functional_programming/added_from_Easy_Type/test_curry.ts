import {curry,n_curry} from './curry';

namespace TestCurry{


    let add = (a:number, b: number , c:number ) => a + b + c;
    let add4 = curry(add,1);
    console.log(add4(2,1));;

    let add2 = n_curry(add);
    
    let ans = add2(1)(1)(1);
    console.log(ans);

}