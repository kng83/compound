
namespace Es2019{

    let arr = [1,23,3,34,[2,2,2],[[1,2,3],[56,3]]];
   // let flattedArr =  arr.flat(Infinity)
 //   console.log(flattedArr); //not supported by node

 let me:any;
  console.log(me?.some.steam); // zwraca undefined

  // nowy operator zamiast || jest lepszy bo mozna napisac foo.some gdy || to bylby error (i tak jest)
  let foo:any;
  const bar = () => 1;
  let x = foo ?? bar(); // if foo==undefined or null then  bar() else foo

  console.log(x);
  //--------------------------assertion
  
  function yell(str:any) {
    assert(typeof str === "string","Error:to nie jest string");
    return (str as any).caseSelect();
}

function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg);
    }
}
  try{
    let some = yell(23);
  } catch(e){
    console.log(e.message);

  }

  console.log("------------------------------------------");
  console.log("sprawdzenie assercji do string");
  function assertIsString(val: any): asserts val is string {
    if (typeof val !== "string") {
        throw new Error("Not a string!");
    }
}

  try {
    let me = assertIsString(40);

  }catch (e){
    console.log(e.message);
  }


  
}