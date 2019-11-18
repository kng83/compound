// Generator do drzewa

/*Practical use of generators: Robienie drzewa czegos
* W tym przypadku to drzewo komentarzy aby iterowac po nim
* array helper as map don't works with generators
* musimy dodac iterator do klasy*/
namespace Generator_3 {


    class Comment {

        constructor(public content: string, public children: Comment[]) {
       
        }
        
        /* troche inna skladnia uzywamy for loop aby
        * przejsc przez kazda iteracje
        */

        *[Symbol.iterator](): any {
        //    yield this.content;
            let childArr = [];
            for (let child of this.children) {
                childArr.push({content:child.content, children:child.children});
            }
            yield {content:this.content , children:childArr};

        }
    }

    const children = [
        new Comment('to jest pierwszy tekst', []),
        new Comment('drugi tekst', []),
        new Comment('trzeci tekst', [])

    ];

    //root node which has 3 children
    const tree =  new Comment('Glowny tekst', children);

    //console.log(tree);
    /*Pobieramy wartosci z calego naszego drzewa i robimy agregacje
     */
    const values = [];
    for (let value of tree) {
        values.push(value);
    }
    console.log(values);
    console.log(values[0])
    console.log('-----------------------------------------------')
    // //zageszczamy to jeszcze

    const secondTree = new Comment('To trzeci poziom',[tree]);
    const threeValues = [];
    for(let three of secondTree){
        threeValues.push(three);
    }
    console.log(threeValues[0].children[0]);
    
}
