namespace ObserverPattern3 {

    type State = {};


    abstract class Observer {
        abstract changeFromNotary(value: any): void;
        abstract changeToNotary(notary: Notary, value: any): void;

        private notary!: Notary; // tu mi sie nie podoba ze jest public 
        protected sendToNotary(value: any) {
            if(notary){
                this.notary.registerChange(value);
            } else{
                throw Error('There is no notary');
            }
        }
    }

    abstract class NotaryRegister {
        constructor(public observerArr: Observer[]) {
            this.registerNotary();
        }

        registerNotary() {
            this.observerArr.forEach((observer: Observer) => {
                // because notary is protected
                observer['notary'] = this as unknown as Notary;
            })
        }
    }

    class Notary extends NotaryRegister {

        emitChange(value: any) {
            for (let observer of this.observerArr) {
                observer.changeFromNotary(value);
            }
        }

        registerChange(value: any) {
            for (let observer of this.observerArr) {
                observer.changeFromNotary(value);
            }
        }
    }

    class User extends Observer {
        state!: State;
        changeFromNotary(value: any) {
            this.state = value;
        }

        changeToNotary(value: any) {
            this.sendToNotary(value);
        }
    }

    let user_1 = new User();
    let user_2 = new User();

    let notary = new Notary([user_1, user_2]);
    user_1.changeToNotary('kot');;



    // notary.emitChange(4);
    // jest emisja stanu do wszystkich uzytkownikow za pomoca notariusza
    console.log(user_1.state, 'log user_1');
    console.log(user_2.state, 'log user_2');
    user_2.changeToNotary('pies');
    console.log(user_1.state);;


}