
namespace Container_1 {

    class Container<T> {

        public $value: T;
        constructor(x: T) {
            this.$value = x;
        }

        static of<T>(x: T) {
            return new Container(x);
        }

        map(callbackfn: (value: T) => T): Container<T> {
            return Container.of(callbackfn(this.$value));
        }
    }


    let ans = Container.of(4).map((value) => value + 2).map((value)=>value * 2);
    console.log(ans);
}