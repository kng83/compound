// funkcje aplikujace

namespace ApplyFunctions_1 {

    //------------------------------------------------------------------
    class Container<T> {

        public $value: T;
        constructor(x: T) {
            this.$value = x;
        }

        static of<T>(x: T) {
            return new Container(x);
        }

        map(callbackfn: (value: T) => T): Omit<Container<T>,'ap'> | Pick<Container<T>,'ap'> {
            let functionResponse = callbackfn(this.$value);
            if(typeof functionResponse === 'function'){
                return Container.of(functionResponse) as Pick<Container<T>,'ap'>
            } else{
                return  Container.of(functionResponse) as Omit<Container<T>,'ap'>
            }
           
        }

        ap(otherContainer: Container<T>) {
            return otherContainer.map((value) => {
                    return (this.$value as any)(value);
               
            });
        };
    }


    const add = (a: number) => (b: number) => (c:number) => a + b + c;
    const addText = (textOne:string) => (textTwo:string) => textOne + ' do ' + textTwo;
    const addText3 = (text:string) => text.toUpperCase();

    // poniewaz funkcja ma add 3 stopniowe to wywolywany jest app 3 razy
    let me = Container.of("some tekes").map(addText3);
    console.log(addText3('bobo'));
    console.log(me);

}