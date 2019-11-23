import fs from 'fs';
import path from 'path';
import { compose ,pipe} from './pipe';

type Fork<T> = (resolve: (value?: T) => void, reject: (reason?: any) => void) => void;

class SimpleTask<T> {
  constructor(private fork: Fork<T>) { }

  // ----- Functor (SimpleTask a)
  map <R extends any>(fn:((value?: T) => R)) {
    return new SimpleTask<R>((resolve, reject) => {
      this.fork(pipe(fn,resolve),reject)
    });
  }

  then(callback: (value?: T) => void) {
    console.log('&&&&&',this.fork.toString(),'&&&&&')
    this.fork(
      (value?: T) => callback(value),
      (err: any) => err);
    return this;
  }

  catch(callback:(err:any)=>void){
    this.fork(
      (value?:T)=>value,
      (err:any)=>callback(err)
    )
  }

  // ----- Applicative (SimpleTask a)
  ap(f: any) {
    return this.chain((fn: any) => f.map(fn));
  }

  // ----- Monad (SimpleTask a)
  chain(fn: any) {
    return new SimpleTask((resolve: any, reject: any) =>
      this.fork( (x: any) => fn(x).fork(reject, resolve),reject));
  }

  join() {
    return this.chain((x: any) => x);
  }
}

let someSimple = { bobo: 3, name: 'ssss' };

const readSome = <T>(value: T) => new SimpleTask<T>((resolve, reject) => {
  resolve(value);
})

readSome(someSimple).map((value) => value? .name).then(value=>console.log(value)).catch(console.log);


//** Here is may promise example read from file  */
const readFile = (filename:string) => new SimpleTask<string>((resolve:any, reject:any) => {
  let pathToReadme = path.join(__dirname,'../../../',filename);
  fs.readFile(pathToReadme, (err, data) => {
    if(err){
      return reject(err);
    }else {
       return resolve(data.toString('ascii'));
    }
  })
});

//to dziala i dziala dobrze
 //readFile('./readme.md').then(console.log).catch(err=>console.log(err,'this is error'));