
namespace Generator_1{


    function *numbers(arr:number[]):any{
       for(let element of arr){
           const ans  = yield element;
           if(ans){
            yield* numbers(arr); // to robi przejscie od nowa po generatorze a break sprawia ze nie ma powrotu juz z do funkcji
            break;
           }
       }
        yield* numbers(arr); // to zrobi nieskonczona petle next
      
    }

    let checkNumbers = numbers([4,5,6]);
    console.log(checkNumbers.next());  // { value: 4, done: false }
    console.log(checkNumbers.next());  // { value: 5, done: false }
    console.log(checkNumbers.next(true));  // { value: 6, done: false }
    console.log(checkNumbers.next());  // { value: undefined, done: true }
    console.log(checkNumbers.next());  // { value: undefined, done: true }
    console.log(checkNumbers.next());  // { value: undefined, done: true }
    

}