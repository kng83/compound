import { curry } from '../Functions/curry';
import R from 'ramda';

namespace TestCurry {

    let add = (a: number, b: number, c: number) => a + b + c;
    let add4 = curry(add)(4);
    console.log(add4(1, 2));

}