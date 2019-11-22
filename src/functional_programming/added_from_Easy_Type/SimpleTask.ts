type Fork<T> = (resolve: (value?: T) => void, reject: (reason?: any) => void) => void;

class SimpleTask<T> {
  constructor(private fork: Fork<T>) { }

  // ----- Functor (SimpleTask a)
  map<R>(fn: (value:Fork<T>)=>R) {
    return new SimpleTask<T>((resolve, reject) => {
      return this.fork(fn(resolve), reject)
    });
  }


  then(callback: (value?: T) => void) {
    this.fork(
      (value?: T) => callback(value),
      (err: any) => err);
  }

  // ----- Applicative (SimpleTask a)
  ap(f: any) {
    return this.chain((fn: any) => f.map(fn));
  }

  // ----- Monad (SimpleTask a)
  chain(fn: any) {
    return new SimpleTask((reject: any, resolve: any) =>
      this.fork(reject, (x: any) => fn(x).fork(reject, resolve)));
  }

  join() {
    return this.chain((x: any) => x);
  }
}

let someSimple = { bobo: 3, name: 'ssss' };

const readSome = <T>(value: T) => new SimpleTask<T>((resolve, reject) => {
  resolve(value);
})

readSome(someSimple).map(value => value).then((value) => {
  console.log(value);
});

// let meto = new Promise((resolve, reject) => {
//   resolve(10);
//   reject(4);
// })
