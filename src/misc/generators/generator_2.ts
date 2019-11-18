namespace Generator_2{

    const colors = {
        red:'czerwony',
        black: 'czarny',

        [Symbol.iterator] : function *(){
            yield this.red;
            yield this.black;
        }
    }

    for(let color of colors){
        console.log(color); // czerwony ,czarny
    }


/*----------------------------------*/console.log('--------------------------------');
    // teraz test z klasa

    class Colors{
        red = 'czerwony';
        black = 'czarny';
        pink  = 'rozowy';

        *[Symbol.iterator](){
            yield this.red;
            yield this.black;
        }
    }

    let colorsPallet = new Colors();
    for(let c of colors){
        console.log(c);
    }

    /*----------------------------------*/console.log('--------------------------------');
    class SuperColor extends Colors{
    //    red='czerwony';
    //  black = 'czarny';
        blue = 'niebieski';

        makeMe(){
            'some text';
        }
        ape = () =>{
            return 'malpa'
        }

        *[Symbol.iterator](){
            let properties=  Object.getOwnPropertyNames(this);
                for(let prop of properties){
                    if(typeof (this as any)[prop] !== 'function'){
                        yield (this as any)[prop];
                    }

            }
        }

    }

    let superColor = new SuperColor();
    for(let sColor of superColor){
        console.log(sColor); // brane sa rowniez pola dziedziczone (funkcje i gettery i settery nie sa brane po uwage)
    }
}