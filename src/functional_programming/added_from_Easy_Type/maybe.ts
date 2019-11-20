import { curry, match, prop, add,toString } from './common';

class Maybe<T> {
  $value: any;

  static of<T>(x: T) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  constructor(x: T) {
    this.$value = x;
  }

  map<D>(fn: (value: T) => D): Maybe<D> {
    if (this.isNothing) {
      return this as any as Maybe<never>;
    } else {
      return Maybe.of(fn(this.$value));
    }
    // return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  inspect() {
    return this.isNothing ? 'Nothing' : `Just(${(this.$value)})`;
  }
}


let checkRegIg = Maybe.of('Malkovich Malkovich').map(match(/al/ig));
console.log(checkRegIg);
// console.log(Maybe.of(null).map(match(/a/ig))); //Nothing
let checkJust24 = Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10)).map(toString);
console.log(checkJust24,'what answer'); //JUST(24)