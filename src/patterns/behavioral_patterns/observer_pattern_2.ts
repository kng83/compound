namespace ObserverPattern2 {

    type State = {};

    abstract class Observer {
      abstract  changeFromNotary(value:any):void;
      abstract changeToNotary(notary:Notary,value:any):void;
    }

    class Notary{
        constructor(public observerArr: Observer[]){

        }

        emitChange(value:any){
            for(let observer of this.observerArr){
                observer.changeFromNotary(value);
            }
        }

        registerChange(value:any){
            for(let observer of this.observerArr){
                observer.changeFromNotary(value);
            }
        }

    }


    class User extends Observer {

        state!:State;
 
        changeFromNotary(value:any){
            this.state = value;
        } 
        
        changeToNotary(notary:Notary,value:any){
            notary.registerChange(value);
        }
    }

    let user_1 = new User();
    let user_2 = new User();

    let notary = new Notary([user_1,user_2]);
    user_1.changeToNotary(notary,'kot');



    // notary.emitChange(4);
    // jest emisja stanu do wszystkich uzytkownikow za pomoca notariusza
    console.log(user_1.state,'log user_1');
    console.log(user_2.state,'log user_2');
    user_2.changeToNotary(notary,'pies');
    console.log(user_1.state);


}