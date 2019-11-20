namespace PartTypes_1{

    //type inference
    type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
    type T10 = Foo<{ a: string, b: string }>;  // string
    type T11 = Foo<{ a: string, b: number }>;  // string | number

    type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;

    let addSome = (a: number, b: string) => a + b;
    type me = ArgumentTypes<typeof addSome>; //[number,string];

    //type prop
    type PropInfer = <K extends string> (key: K) => <T extends { [key in K]: any }>(value: T) => T[K];
    let propInfer: PropInfer = (key) => (value) => value[key];
    let pi = propInfer('age')({ name: 2, age: { some: 1, other: 4 } }); // out {some:number,other:number}

}