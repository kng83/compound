import { curry } from './curry';
import R from 'ramda';

namespace TestCurry {

    let add = (a: number, b: number, c: number) => a + b + c;
    let add4 = curry(add)(4);
    console.log(add4(1, 2));

    // testing making prop function

    let prop = <T, K extends keyof T>(key: K, value: T): T[K] => value[key];

    let propInfer = <T extends {[key:string]:any}, K extends keyof T ,R> (key:K) => (value:T) => value[key];


    const curryProp = curry(<T,K extends keyof T>(p:K, obj:T) => obj[p]);

    
    let sampleObj = { name: 'Pawel', age: 35 };
    let otherObj = { name: 'Rob' };
    let sampleObjAge = curryProp('age')(otherObj);

    let pi = propInfer('names')(sampleObj);


    type FuncWithOneObjectArgument<P extends { [x: string]: any }, R> = ( props: P) => R;
}