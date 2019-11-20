
// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
import { compose, pipe } from './pipe';

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
import { curry } from './curry';

// prop :: String -> Object -> a
const prop = <K extends string>(key: K) => <T extends { [key in K]: any }>(value: T) => value[key];

const add = (add: number) => (val: number) => val + add;
const toString = (val: any) => val.toString();
const toUpper = (val: string) => val.toString().toUpperCase();
const strAdd = (addString: string) => (val: string) => addString + val;
const append = (str: string) => (val: string) => str + '' + val;
const identity = <T>(x: T): T => x;
const tap = <T>(val: T): T => { console.log(val); return val; }
const match = (reg: string) => (val: string) => val.match(reg);

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = curry((fn, xs) => xs.filter(fn));

const map = curry((fn, f) => f.map(fn));


// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }
  return g(e.$value);
});

// inspect :: a -> String
const inspection = <T extends { inspect: any }>(x: T): string => {
  if (x && typeof x.inspect === 'function') {
    return x.inspect();
  }
  return (typeof x === 'function') ? inspectFn(x) : inspectArgs(x);
};

function inspectFn<T extends { name: any }>(f: T): string {
  return f.name ? f.name : f.toString();
}


function inspectTerm(t: string | Object): string {
  switch (typeof t) {
    case 'string':
      return `'${t}'`;
    case 'object': {
      const ts = Object.keys(t).map(k => [k, inspection(t[k])]);
      return `{${ts.map(kv => kv.join(': ')).join(', ')}}`;
    }
    default:
      return String(t);
  }
}

//** Inspection of function arguments */
function inspectArgs<T extends any[]>(args: T): string {
  return Array.isArray(args) ? `[${args.map(inspection).join(', ')}]` : inspectTerm(args);
}

// split :: String -> String -> [String]
// const split = curry((sep, str:string) => str.split(sep));
const split = (sep: string) => (str: string) => str.toString().split(sep);

// head :: [a] -> a
const head = <T extends any[]>(xs: T) => xs[0];

export { curry, either, compose, pipe, head, prop, add, toString, toUpper, strAdd, append, identity, tap, match, inspection, map };