import fs from 'fs';
import path from 'path';
import { split, toUpper } from './common';


class MoreSimpleTask<T> {
  constructor(private fork:  (resolve: (value: T) => void) => void) { } //function (resolve){resolve(someSimple)}
  
  then(r: (value: T) => void) {
    console.log(this.fork.toString());               //function (resolve){resolve(someSimple)}
    console.log(r.toString());                       //function (value) { return console.log(value, '2'); }
    this.fork(val => {  // function(value=>)
        console.log('VALUE',val,'VALUE');
        r(val)
    })
    return this;
  }
  
  map<R>(fn: ((value: T) => R)): MoreSimpleTask<R> {
    return new MoreSimpleTask<R>(resolve => {
      this.fork(value => resolve(fn(value))); //here is pipe operator
    });
  }

}

//** Simple object check for promise */
let someSimple = { bobo: 3, name: 'Bobo kot jest super' };
const readSome =  new MoreSimpleTask<typeof someSimple>(resolve=> {
  resolve(someSimple);
})

//** Reading block with promise based api */
readSome.then(value => console.log(value, '2'))


//** Here is may promise example read from file  */
const readFile = (filename: string) => new MoreSimpleTask<Buffer>(resolve=> {
  let pathToReadme = path.join(__dirname, '../../../', filename);

  fs.readFile(pathToReadme, (err, data) => {
      return resolve(data);
  })
});

//this is good and work well
readFile('./readme.md').map(data=>data.toString('ascii')).map(split('\n')).then(console.log);

