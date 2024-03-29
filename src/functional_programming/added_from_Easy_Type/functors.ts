
class Container<T> {
  constructor(private value: T) {
  }

  static of<T>(x: T) {
    return new Container(x);
  }
  map(fn: (value: T) => T): Container<T> {
    return Container.of(fn(this.value));
  }
}

let testedContainer = Container.of(8).map(two => two * 2).map(some => some + 1)
console.log(testedContainer);