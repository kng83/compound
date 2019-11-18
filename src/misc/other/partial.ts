namespace PartialExample{


    interface Person{
        name:string;
        age:number;
        location:string;

    }

    type Optionalize<T> = {
        [K in keyof T]?: T[K];
    }

    // wszystkie sa teraz opcjonalne
    type PartialPerson = Optionalize<Person>;

    type Promisify<T> = {
        [K in keyof T]:Promise<T[K]>

    }

    // teraz bedzie tak ze bedziemy mieli liste obietnic z roznymi typami
    type Promisy = Promisify<[number,string,boolean]>
}

