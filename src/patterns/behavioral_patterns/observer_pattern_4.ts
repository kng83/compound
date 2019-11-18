namespace ObserverPattern4 {

    type State = {};


    abstract class Observer {
        abstract changeFromNotary(value: any): void;
        abstract changeToNotary(notary: Notary, value: any): void;

        public notary!: Notary; // tu mi sie nie podoba ze jest public 
        public observerName!:string;
        protected sendToNotary(value: any) {
            if (notary) {
                this.notary.registerChange(value);
            } else {
                throw Error('There is no notary');
            }
        }
    }

    interface ObserverWrapper {
        observerName:string;
        observer:Observer;
    }
    abstract class NotaryRegister {
        constructor(public observerArr: ObserverWrapper[]) {
            this.registerNotary();
        }

        registerNotary() {
            this.observerArr.forEach((observerWrapper: ObserverWrapper) => {
                // because notary is protected
                observerWrapper.observer.notary = this as unknown as Notary;
                observerWrapper.observer.observerName = observerWrapper.observerName;
            })
        }
    }

    class Notary extends NotaryRegister {

        emitChange(value: any) {
            for (let observer of this.observerArr) {
                observer.observer.changeFromNotary(value);
            }
        }

        registerChange(value: any) {
            for (let observer of this.observerArr) {
                observer.observer.changeFromNotary(value);
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
    let user_3 = new User();

    let notary = new Notary([
        {observer:user_1, observerName:'user_1'}, 
        {observer:user_2, observerName:'user_2'}, 
        {observer:user_3, observerName:'user_3'}]);

    user_1.changeToNotary('kot');;



    // notary.emitChange(4);
    // jest emisja stanu do wszystkich uzytkownikow za pomoca notariusza
    console.log(user_1.state, 'log user_1');
    console.log(user_2.state, 'log user_2');
    user_2.changeToNotary('pies');
    console.log(user_1.state);;
    console.log(user_1.observerName);


}