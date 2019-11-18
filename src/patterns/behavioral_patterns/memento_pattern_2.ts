
namespace MementoPattern2 {

    interface State { }

    class Memento {
        constructor(private state: State) {
            this.state = Object.assign({} as State, state);

        }
    }

    //Ten obiekt przechowuje historie i za pomoca metod dostepowych mozna zwracac stan
    //historia nie jest wrzucana do pamiecie
    abstract class Caretaker {
        public history: any[] = [];
        save(): void {
            let {history, ...everythingWithoutHistory} = this;
            this.history.push(new Memento(everythingWithoutHistory));
        }
        restore(): void {
           const momento  =  this.history.pop();
           const state =  momento !== undefined ? momento.state : this;
           Object.assign(this as State, state);
        }      
    }

    class SomeStateClass extends Caretaker {
        name = 'pawel';
        age = 4;
        weight = 300;
    }

    let someClass = new SomeStateClass();
    someClass.save();
    console.log(someClass.history);
    someClass.name = 'Bobo';
    someClass.save();
    console.log(someClass,'------------');
    someClass.name = 'Waldek';
    someClass.restore();
    someClass.age = 30;
    someClass.save();
    someClass.restore();
    someClass.restore();
    someClass.restore();
   // someClass.restore();
    console.log(someClass);
    
}