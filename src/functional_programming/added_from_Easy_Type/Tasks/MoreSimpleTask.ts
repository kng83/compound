
//** To jest przyklad jak zrobic wlasnego promisa to jest jeden zajprostrzych przykladow */
namespace MoreSimpleTaskExample{
  class MoreSimpleTask<T>{
    constructor(private fork:(resolve: (value: T) => void)=>void){} // save reference to function
  
    then(resolve:(value:T)=>void){
      this.fork( value=>resolve(value)) //call fork and pass function
    }
  }
  
  let someObj = {name:'Pawel',age:4};
  
  let someMoreSimpleTask = new MoreSimpleTask<typeof someObj>(resolve=>resolve(someObj));
  someMoreSimpleTask.then(value =>console.log(value));
  
  
  //** Tak to idzie
  let fork = function(resolve:any){ resolve(someObj)} // to jest zapisane w klasie jako fork
  let pass = function(value:any){ console.log(value,'nr 2')} // to idzie do funkcji then
  fork(pass); // wywolanie w then
  

}
