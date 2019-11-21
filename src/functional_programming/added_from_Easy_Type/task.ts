import { match, add, map, prop, identity,pipe, strAdd, tap, toUpper, compose, curry, append, toString,  either, inspection, head, split } from './common';
import util from 'util';
import fs from 'fs';

class Task<T> {
  public fork: <N, P>(reject: N, resolve: P) => Task<T>;

  constructor(fork:(reject: any, resolve: any) => Task<T>) {
    this.fork = fork;
  }

  [util.inspect.custom]() {
    return 'Task(?)';
  }

  static rejected<N>(x: N) {
    return new Task((reject: (x: N) => Task<N>, _?: any) => reject(x));
  }

  // ----- Pointed (Task a)
  static of<D>(x: D) {
    return new Task((_, resolve) => resolve(x));
  }

  // ----- Functor (Task a)
  map<R>(fn:(value:T)=>R) {
    return new Task((reject, resolve) => this.fork(reject, pipe(fn,resolve)));
  }

  // ----- Applicative (Task a)
  ap<R>(fn:any) {
    return this.chain((fn:any) => fn.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn:any) {
    return new Task((reject, resolve) => this.fork(reject, (x:any) => fn(x).fork(reject, resolve)));
  }

  join() {
    return this.chain(identity);
  }
}

const readFile = (filename:string) => new Task((reject:any, result:any) => {
  return fs.readFile(filename, (err, data) => (err ? reject(err) : result(data))) as any as any;
});

  //to nie wiem dlaczego nie dziala
 let readf =  readFile('./readme.md').map(split('\n')).map(head).fork((err:any,val:any)=>console.log(err,val));

