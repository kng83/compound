
// lets make a class mixin

namespace ClassMixin {
    
    // typ konstrukora 
    type Constructor<T> = new(...args: any[]) => T;
    
    // funckjc miksujaca
    function Tagged<T extends Constructor<{}>>(Base: T) {
        return class extends Base {
            _tag: string;
            constructor(...args: any[]) {
                super(...args);
                this._tag = "";
            }
        }
    }
    //--------------------------------------------
    
    class Point {
        constructor(public x: number, public y: number) {}
    }

    const TaggedPoint = Tagged(Point);  
    let point = new TaggedPoint(10, 20);
    point._tag = "hello";
    console.log(point);
    
    //===========================================
    
    class Person {
        constructor(public name: string) {}
    }
    class Customer extends Tagged(Person) {
        constructor(public accountBalance: number,public name:string){
            super(name);
        }
    }


    let customer = new Customer(100,'robert');
    customer._tag = 'some tag';
    console.log(customer);
    
}