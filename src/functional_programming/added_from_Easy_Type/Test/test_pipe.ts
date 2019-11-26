import {pipe} from '../Functions/pipe';
import {curry} from '../Functions/curry';

namespace TestPipe_1{

    const add1 = (a:number) => a + 1;
    const mul2 = (a:number) => a * 2;
    const addTwoNumbers = (a:number)=>(b:number)=>a +b;
    const addTwo = curry((a:number,b:number)=>a + b);

    let someFunction = pipe(add1,mul2,addTwoNumbers(4),addTwo(2));
    let ans = someFunction(2);
    console.log(ans);


}