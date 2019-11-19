import { match, add, prop, identity, strAdd, toUpper, compose, append, toString, tap } from './common';

class Container<T> {
  private $value: T;
  constructor(x: T) {
    this.$value = x;
  }

  static of<T>(x: T) {
    return new Container(x);
  }
}
console.log(Container.of(3)); //Container { '$value': 3 }
console.log(Container.of(Container.of({ name: 'yoda' }))); //Container { '$value': Container { '$value': { name: 'yoda' } } }

const mapper = (f:Function) => (value:any) => Container.of(f(value));
let upperCase = compose(tap, mapper(toUpper));
upperCase("bobo");