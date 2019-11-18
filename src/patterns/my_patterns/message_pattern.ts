

namespace MessagePattern{


interface Payload<T>{
    workKey: keyof T;
    content: any;
}



class MessageBasic{
       
}

abstract class Message extends MessageBasic{
    abstract  resolvePayload<T extends Message>(payload:Payload<T>):any;
    private processField:any;
    private answerField:any;

    sendMessageTo<C extends Message>(instance:C ,payload: Payload<C>):Pick<Message,"takeResponse">{
        this.processField = instance.resolvePayload(payload);    
        return this;
    } 
    
    takeResponse<T>(fn:{(done:boolean, err?:boolean,content?:T):void}){
        if(this.processField){
            return fn(true,false, this.processField);
        }
        return fn(false,true, undefined);
    }
}

class User extends Message{
    some:any;
    resolvePayload(payload:any){
        return payload;
    }
}

/*
let testMessage = new User();
let testMessage2 = new User();
    testMessage.sendMessageTo(testMessage2,{workKey:"",content:"other things"})
        .takeResponse((done,err,content)=>{
            console.log(content);
        })


    
    }
*/
}