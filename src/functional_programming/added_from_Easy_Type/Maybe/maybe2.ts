import {identity,match} from '../Functions/common';

class Wrapper<T> {
    private _value: T;
    constructor(value: T) {
        this._value = value;
    }
    static of<T>(x: T) {
        return new Wrapper(x);
    }

    map<D>(fn: (value: T) => D): Wrapper<D> {
        return Wrapper.of(fn(this._value));
    }

    join():Wrapper<T> {
        if (!(this._value instanceof Wrapper)) {
            return this;
        }
        return this._value.join();
    }

    toString() {
        return `Wrapper (${this._value})`;
    }
}

//test
let some = Wrapper.of("Czesc i czolem").map(match(/cz/gi)).join().map(identity);
console.log(some);
