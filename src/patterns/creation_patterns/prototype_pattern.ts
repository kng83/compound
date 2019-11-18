
//** Because javascript is prototype language when we derived object we get state */

namespace PrototypePattern {


    interface Constructor<T> {
        new(): T;
    }
    function createFancyObject<T>(constructor: Constructor<T>): T {
        return new constructor();
    }

    class Base {
        state!: number;
    }

    let base = new Base();
    base.state = 10;

    class Derived extends Base {

        static mountPrototype(prototypeClass: Base) {
            Derived.prototype = prototypeClass;
            return new Derived();
        }

    }

    // dostep do prototypu daje nam wartosc
    // Derived.prototype = base;
    // W mojej wersji robie static zwracajacy klase i w niej ustawiam prototyp na bazowy
    let derived = Derived.mountPrototype(base);
    console.log(derived);
}