
namespace TestInfer {

    function add(a: number, b: string) { return a + b };

    //---------------------------------------------------Take parameters---------------------------------
    type TestParams = Parameters<typeof add> // [number, string]
    //old way
    type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

    //---------------------------------------------------Return type-------------------------------------
    type ReturnFromAdd = ReturnType<typeof add>; //string;

    //old way
    type ReturnFromAdd2<T extends (...args: any) => any> = T extends (...arg: any) => infer R ? R : any;

}