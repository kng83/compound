
// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
import { compose, pipe } from './pipe';
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
import { curry } from './curry';

let prop = (prop: any) => (val: any) => val[prop];
let add = (add: number) => (val: number) => val + add;
let toString = (val: any) => val.toString();
let toUpper = (val: string) => val.toString().toUpperCase();
let strAdd = (addString: string) => (val: string) => addString + val;
let append = (str: string) => (val: string) => str + '' + val;
const identity = <T>(x: T): T => x;
let tap = <T>(val: T): T => { console.log(val); return val; }
let match = (reg: string) => (val: string) => val.match(reg);

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

export { compose, pipe, head, prop, add, toString, toUpper, strAdd, append, identity, tap, match, inspection };