import {inspect} from 'util';

namespace Either_1 {

    class Either<T> {
        protected $value:T;
        static of<T>(x:T) {
            return new Right<T>(x);
        }

        constructor(x:T) {
            this.$value = x;
        }
    }

    class Left<T> extends Either<T> {
        map(fn: () => T) {
            return this;
        }

        inspection() {
            return `Left(${inspect(this.$value)})`;
        }
    }

    class Right<T> extends Either<T> {
        map(fn: (value: T) => T) {
            return Either.of(fn(this.$value));
        }

        inspection() {
            return `Right(${inspect(this.$value)})`;
        }
    }

    const left = (x:any) => new Left(x);

    let some = Either.of('rain').map(str => `b${str}`); 
    console.log(some);
}
