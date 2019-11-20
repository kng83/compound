
class Maybe3<T> {
  private _value: T;
  private _count = 0;

  static of<T>(x: T) {
    return new Maybe3(x);
  }

  get isNothing() {
    return this._value === null || this._value === undefined;
  }

  constructor(x: T) {
    this._count++;
    this._value = x;
  }

  map<D>(fn: (value: T) => D): Maybe3<D> {
    return this.isNothing ? this as any as Maybe3<D> : Maybe3.of(fn(this._value));
  }

  check() {
    return this.isNothing ? 'Nothing' : `Just(${this.identity(this._value)})`;
  }
  identity<T>(x: T) {
    return x;
  }
  referenceCounter() {
    return this._count;
  }
}


let match3 = (reg: string | RegExp) => (val: string) => val.match(reg);
let prop3 = <K extends string>(key: K) => <T extends { [key in K]: any }>(value: T) => value[key];
let add3 = (add: number) => (val: number) => val + add;
let arrToString = <T extends any[]>(arr:T | null |undefined) => {
  if(arr instanceof Array){
      return arr.toString()

  } else{
    return '';
  }
};
let toUpper3 = (val: string) => {
  if (typeof  val === "string") {
    return val.toString().toUpperCase()
  } else {
     return val;
  }

};
let strAdd = (addString: string) => (val: string) => addString + val;
let tap = <T>(val: T) => { console.log(val); return val; }

// to jest dobre w typie toUpper3 pozbywamy sie nulla na zawsze w tym przykladzie
let m3 = Maybe3.of('Malkovich Malkovich')
  .map(match3(/alk/ig))
  .map(tap)
  .map(arrToString)
  .map(toUpper3)
  .map(strAdd('some'));
console.log(m3,'this is type m3');
console.log('ref counter', m3.referenceCounter());

let m33 = Maybe3.of({ name: 'Dinah', age: 14 }).map(prop3('age')).map(add3(10));
console.log(m33);
