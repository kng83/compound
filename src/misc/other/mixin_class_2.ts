namespace MixinClass_2 {

    type Constructor<T> = new (...arg: any[]) => T;

    // dodawanie iteratora do klasy
    function mixIterator<T extends Constructor<{}>>(Base:T){
        return class extends Base{

            *[Symbol.iterator](){
                let paramsArr = Object.getOwnPropertyNames(this);
                
                for(let param of paramsArr){
                    if(typeof param !== 'function'){
                        yield param;
                    }
                }
            }
        }
    }

    class User{
        constructor(public name:string , public age:number){}
    }

    const IterableUser = mixIterator(User);
    let iUser = new IterableUser("John",40);
    
    for(let prop of iUser){
        console.log(prop);
    }

}