import { identity,pipe,head, split,compose } from './common';
import util from 'util';
import fs from 'fs';
import path from 'path';

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
  // static of<D>(x: D) {
  //   return new Task((_, resolve) => resolve(x));
  // }

  // ----- Functor (Task a)
  map<R>(fn:(value:T)=>R) {
    console.log('this fork to string',this.fork.toString());
    return new Task((reject, resolve) => this.fork(reject, compose(resolve,fn)));
  }

  // ----- Applicative (Task a)
  ap<R>(fn:any) {
    return this.chain((fn:any) => fn.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn:any) {
    return new Task((reject, resolve) => this.fork(reject, (x:any) => fn(x).fork(reject, resolve)));
  }

  // join() {
  //   return this.chain(identity);
  // }
}

const readFile = (filename:string) => new Task((reject:any, result:any) => {
 let pathToReadme = path.join(__dirname,'../../../',filename);
  console.log(reject.toString(),result.toString());
  fs.readFile(pathToReadme, (err, data) => {
    console.log('this is incoming');
    if(err){
      console.log('this is err',err);
      return reject(err);
    }else {
    //  console.log('this is data',data.toString('ascii'));
      return result(data.toString('ascii'));
    }
  }) as any as any;
});

  //to nie wiem dlaczego nie dziala
 readFile('./readme.md').map(split('\n')).map(head).fork((err:any,val:any)=>console.log(err,val));

