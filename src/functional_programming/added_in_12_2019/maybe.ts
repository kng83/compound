import {inspect} from 'util';
namespace Maybe_2{


    class Maybe <T>{

        private $value:T;
        static of<T>(x:T) {
          return new Maybe(x);
        }
      
        get isNothing() {
          return this.$value === null || this.$value === undefined;
        }
      
        constructor(x:T) {
          this.$value = x;
        }
      
        map(fn: (value: T) => T): Maybe<T> {
          return this.isNothing ? this : Maybe.of(fn(this.$value));
        }
        
        // inspect is deprecated
        inspection():string {
          return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
        }
      }


      //let maybe =  Maybe.of(2).map((some)=>some +1).map(value=>value * 2).inspection();
      let maybe =  Maybe.of(null);
      console.log(maybe);

}