import 'reflect-metadata';

@printMetadata
class Plane {
    color: string = 'red';

    @markFunctionFactory('To jest trudne')
 //   @markFunction
    fly(): void {
        console.log('vrrrrrr');
    }
}


// decorator ktory dodaje metadane do klasy
function markFunction(target: Plane, key: string) {
    Reflect.defineMetadata('secret', 123, target, key);

}

function markFunctionFactory(secretInfo:string){
    return function (target:Plane,key:string){
        Reflect.defineMetadata('secret',secretInfo,target,key);
    }
}

const secret = Reflect.getMetadata('secret', Plane.prototype,'fly');
console.log(secret);


// dodajemy decorator do klasy
function printMetadata(target:typeof Plane){
    for (let key in target.prototype){
       const print =  Reflect.getMetadata('secret',target.prototype,key);
        console.log(print);
    }
    
}