namespace IteratorPattern {

    //this example doesn't works

    interface IteratorResult<T> {
        done: boolean;
        value: T | undefined;
    }

    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        return?(value?: any): IteratorResult<T>;
        throw?(e?: any): IteratorResult<T>;
    }

    interface Iterable<T> {
        [Symbol.iterator](): Iterator<T>;
    }


    class SomeIterator<T> implements Iterator<T> {
        index: number;
        constructor(public array: T[]) {
            this.index = array.length - 1;
        }
        
        next(): IteratorResult<T> {
            if (this.index <= this.array.length) {
                return {
                    value: undefined,
                    done: true
                };
            } else {
                return {
                    value: this.array[this.index--],
                    done: false
                }
            }
        }
    }

    class SomeData<T> {
        array!: T[];
        [Symbol.iterator]() {
            return new SomeIterator<T>(this.array);
        }
        constructor(array:T[]){
            this.array = array;
        }
        one =1;
        two =2;
        three ='some';
    }

    let someData = new SomeData( [{name:'pawel'},{name:'s'},{name:'something'}]);

    for(let data of someData){
        console.log(data);
    }

}