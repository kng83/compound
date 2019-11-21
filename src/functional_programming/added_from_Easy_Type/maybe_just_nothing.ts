//Option
class Maybe<T> {
    static just<D>(x: D) {
        return new Just(x);
    }
    static nothing() {
        return new Nothing();
    }
    static fromNullable<D>(x: D) {
        if (x !== null) {
            return Maybe.just(x);
        } else {
            return Maybe.nothing();
        }

    }
    static of<D>(a: D) {
        return Maybe.just(a);
    }
    get isNothing() {
        return false;
    }
    get isJust() {
        return false;
    }
};
//Some
class Just<T> extends Maybe<T> {
    private _value: T;
    constructor(value: T) {
        super();
        this._value = value;
    }

    get value() {
        return this._value;
    }

    map<R>(fn: (value: T) => R) {
        return Maybe.fromNullable(fn(this._value));
    }

    chain(fn: (value: T) => Just<T>) {
        return fn(this._value);
    }

    getOrElse() {
        return this._value;
    }

    filter(fn: (value: T) => boolean) {
        Maybe.fromNullable(fn(this._value) ? this._value : null);
    }

    get isJust() {
        return true;
    }

    toString() {
        return `Maybe.Just(${this._value})`;
    }
};
//None
class Nothing<T> extends Maybe<T> {
    private _value!: T;

    map<R>(fn: (value: T) => R): Nothing<T> {
        return this;
    }
    chain<D>(fn: (value: D) => D) {
        return this;
    }
    get value() {
        throw new TypeError("Nie można pobrać wartości obiektu typu Nothing.");
    }
    getOrElse<D>(other: D): D {
        return other;
    }
    filter() {
        return this._value;
    }
    get isNothing() {
        return true;
    }
    toString() {
        return 'Maybe.Nothing';
    }
};

let match2 = (reg: string | RegExp) => (val: string) => {
    //** Poniewaz tu moze byc null to pozbywamy go sie */
    let ans = val.match(reg);
    if (!ans) {
        return [] as RegExpMatchArray;
    } else {
        return ans;
    }
};
let toUpper2 = () => (val: string) => val.toUpperCase();
let identity2 = <T>(x: T) => x;

//test
let some2 = Maybe.of("Czesc").map(match2(/cze/gi));
console.log(some2);