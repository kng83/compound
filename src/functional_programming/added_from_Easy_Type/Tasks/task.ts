import { identity,pipe,head, split,compose } from '../Functions/common';
import util from 'util';
import fs from 'fs';
import path from 'path';

const reject = (err:any) => err;
const result = (value:any)=>value;

class Task<T> {
  public fork: <N, P>(reject: N, resolve: P) => Task<T>;

  constructor(fork:(reject: any, resolve: any) => Task<T>) {
    console.log(fork.toString(),'^^^^^FORK$$$$$$$$$$$')
    this.fork = fork;
  }

  // [util.inspect.custom]() {
  //   return 'Task(?)';
  // }

  static rejected<N>(x: N) {
    return new Task((reject: (x: N) => Task<N>, _?: any) => reject(x));
  }

  // ----- Pointed (Task a)
  // static of<D>(x: D) {
  //   return new Task((_, resolve) => resolve(x));
  // }

  // ----- Functor (Task a)
  map<R>(fn:(value:T)=>R) {
    return new Task((reject, resolve) =>{
      console.log('this fork to string',this.fork.toString(),'-----',fn);
        console.log(resolve,'after======',fn.toString())
       return this.fork(reject, ()=>fn(resolve))}
       );
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
  tap(){
    console.log('#############TAP',this,'############# TAP');
    return this;
  }
}

// const readFile = (filename:string) => new Task((reject:any, result:any) => {
//   let pathToReadme = path.join(__dirname,'../../../',filename);
//  // console.log(reject.toString());
//   fs.readFile(pathToReadme, (err, data) => {
//   //  console.log('this is incoming');
//     if(err){
//    //   console.log('this is err',err);
//       return reject(err);
//     }else {
//     // console.log('this is data',data.toString('ascii'),result,'----');
      
//        return result(data.toString('ascii'));
//     }
//   }) as any as any;
// });

//   //to nie wiem dlaczego nie dziala
//  readFile('./readme.md').fork((err:any,value:any)=>console.log(err,value,'###this is OUTPUT ####'));
