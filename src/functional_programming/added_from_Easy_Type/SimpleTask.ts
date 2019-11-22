class SimpleTask {
    public fork:any;
    constructor(fork:any) {
      this.fork = fork;
      console.log(this.fork.toString());
    }
    
    // ----- Functor (SimpleTask a)
    map(fn:any) {
      return new SimpleTask((reject:any, resolve:any) => {
        return this.fork(reject, ()=>fn(resolve))
      });
    }
    then(callback:(value:any)=>void) {
      this.fork((err:any)=>err, (value:any) => callback(value));
  
    }
  
    // ----- Applicative (SimpleTask a)
    ap(f:any) {
      return this.chain((fn:any) => f.map(fn));
    }
  
    // ----- Monad (SimpleTask a)
    chain(fn:any) {
      return new SimpleTask((reject:any, resolve:any) =>
       this.fork(reject, (x:any) => fn(x).fork(reject, resolve)));
    }
  
    join() {
      return this.chain((x:any)=>x);
    }
  }
  
  let someSimple = {bobo:3,name:'ssss'};
  
  const readSome = (value:any) => new SimpleTask((reject:any,resolve:any)=>{
    resolve(value);
  })
  console.log('SOME');
  readSome(someSimple).then((value)=>{
    console.log(value);
  });