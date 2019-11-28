
//** Uwaga na tablice nie mozna z nich o tak dzidziczyc nalezy przypisac prototyp do celu */
class MyArray<T> extends Array<T> {

    static of<T>(...items:T[]): MyArray<T> {
        let ret = Object.create(MyArray.prototype);
        ret.push(...items);
        return ret;
    }

    head(){
        return this[0];
    }
    tail(){
        return this[this.length-1];
    }
}


// Works
let myArray = MyArray.of<number>(1,2,3,4); 
myArray.map(value=>console.log(value,'what'))
console.log(myArray.head(),myArray.tail());
console.log(myArray instanceof MyArray);

