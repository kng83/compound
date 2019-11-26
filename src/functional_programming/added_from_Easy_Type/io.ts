import { match, add, prop, identity, strAdd, toUpper, compose, append, toString, tap, pipe, inspection } from './Functions/common';

class IO<T> {
  private $fnValue: () => T;

  static of<T>(x: () => T) {
    return new IO(() => x);
  }

  constructor(fn: () => T) {
    this.$fnValue = fn;
  }

  map<D>(fn: (value: T) => D): IO<D>{
   // return new IO(pipe(this.$fnValue, fn));
   return new IO(()=>fn( this.$fnValue()));

  }

  get value() {
    return this.$fnValue;
  }
  // inspection() {
  //   return `IO(${inspection(this.$fnValue)})`;
  // }
}

//example
// ioWindow :: IO Window
const ob1 = { height: 100, width: 50 };
const ioWindow = new IO(() => ob1);
let io1 = ioWindow.map(ob => ob.height);
console.log(io1.value(),io1);
// IO(1430)