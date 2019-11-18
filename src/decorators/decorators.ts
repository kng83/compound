
@classDecorator
class Boat {
    // @propDecorator
    color: string = 'red';

    @propDecorator
    get formattedColor(): string {
        return `This bout color is ${this.color}`;
    }

    @logError2('This is a new error')
    pilot(): void {
        throw new Error();
    }

    howFast(@parameterDecorator speed: string, @parameterDecorator generateWake: string) {
        if (speed === 'fast') {
            console.log('swish')
        } else {
            console.log('ughhh')
        }
    }


}

/* Target to bedzie nasz prototyp w tym wypadku bedzie to proptyp  Boat czyli wszystkie funkcje i gettery 
   tu beda w srodku ale nie bedzie koloru. Ale mozna dac dekorator do coloru wtedy otrzymamy jego klucz
*/
function testDecorator(target: any, key: string): void {
    console.log('Target', target);
    console.log('key:', key);
}


// tutja dekorator z na stale wpisanym bledem
function logError(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    desc.value = function () {
        try {
            method();

        } catch (e) {
            console.log('Boat was sinking !!!! error from decorator');
        }
    }
}

// Wersja dekoratora z parametrem (zwracamy funkcje dekoratora z funkcji)
//ten patent to dekorator factory
function logError2(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const method = desc.value;
        desc.value = function () {
            try {
                method();

            } catch (e) {
                console.log(errorMessage);
            }
        }
    }
}

function propDecorator(target: any, key: string) {
    console.log(target, key, 'prop decorator');
}

// index w parametrach jest numerem argumentu dla parametrow
function parameterDecorator(target: any, key: string, index: number) {
    console.log('--parametr decorator--------', key, index, target);
}


function classDecorator(constructor:typeof Boat){
    console.log("**************", constructor,"*************");
} 


//jak by nie uzywac dekoratorów to bedzie dzialac identycznie
//to dziala jeszcze przed zrobienie instancji classy
testDecorator(Boat.prototype, 'pilot');


//test
const boat = new Boat();
boat.pilot();