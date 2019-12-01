namespace SingletonExtends{
    class Base {
        name = 'foo';
    
        static makeInstance<T>(this: new () => T) {
            return new this();
        }
    }
    class Extended extends Base {
        age = 10;
    }
    
    let base = Base.makeInstance() // is Base
    let extended = Extended.makeInstance(); //is Extended 
    
    console.log(base.name);//ok
    console.log(extended.age); //ok
    console.log(extended.name);// ok
}