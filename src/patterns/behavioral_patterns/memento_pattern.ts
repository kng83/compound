namespace MementoPattern {

    interface State { }

    class Memento {
        constructor(private state: State) {
            this.state = Object.assign({} as State, state);

        }
        restore(state: State): void {
            Object.assign(state, this.state);
        }
    }

    //** used to save and restore states */
    class Originator {
        state!: State;
        get memento(): Memento {
            return new Memento(this.state);
        }
        set memento(memento: Memento) {
            memento.restore(this.state);
        }
    }

    // ten ktory zarzadza historia

    class Caretaker {
        originator!: Originator;
        history: Memento[] = [];
        save(): void {
            this.history.push(this.originator.memento);
        }
        restore(): void {
            this.originator.memento = this.history.shift() as Memento;
        }
    }

    // to jest bardzo rozwlekle mozna by to uprosci
    let sampleObj = {name:'pawel',age:34};
    
    let originator = new Originator();
    let careTaker = new Caretaker();
    careTaker.originator = originator;

    careTaker.originator.state = sampleObj;
    careTaker.save();

    sampleObj.name = 'Bobo';

    originator.state = sampleObj;
    careTaker.save();


    console.log(careTaker.history);
    careTaker.restore();
    console.log(careTaker.originator.memento);
    
}