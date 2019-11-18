

namespace PromiseExample{

    
    type Promisify<T> = {
        [K in keyof T]:Promise<T[K]>

    }

    declare let strPromise:Promise<string>;
    declare let numPromise:Promise<number>;

    // T extends ReadonlyArray<any> to samo co ponizej
    function promiseAll<T extends readonly any[]>(ps:Promisify<T>):Promise<T>{
        throw "not implemented";
    }

    // jak jest const to dane sa nie mutowalne
    let x = promiseAll([ strPromise,numPromise] as const)
    
    // jak jest readonly i mamy const to wtedy mamy typy po kolei a nie w uni
    async function fetch(){
        let some = await x;
        let b =some[0];

    }
}