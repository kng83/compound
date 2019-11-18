
/*
In the preceding implementation, the factory method buildRocket handles the outline of 
the building steps. We were lucky to have the freight 
rocket in the same structure as the very first rocket we had defined. But that won't always happen.
If we want to change the class of products (Rocket),
we'll have to override the entire buildRocket with everything else but the class name. 
This looks frustrating but it can be solved, again,
by decoupling the creation of a rocket instance from the building process:
*/

class Payload{
    constructor(public weight: number){}
}

class Engine{
    constructor(public power:number){}
}

class Stage{
    constructor(public engineArr:Engine[]){}
}


// by nie bylo bledow to wartosci sa zinicjalizowane 0
class Rocket{
   public payload:Payload = new Payload(0);
   public  stages:Stage[] =[];
}

class RocketFactory {
    createPayload(): Payload {
        return new Payload(0);
    }
    createStages(): Stage[] {
        let engine = new Engine(1000);
        let stage = new Stage([engine]);
        return [stage];
    }
    buildRocket(): Rocket {
        let rocket = new Rocket();
        let payload = this.createPayload();
        let stages = this.createStages();
        rocket.payload = payload;
        rocket.stages = stages;
        return rocket;
    }
}


class Satellite extends Payload {
    constructor(public id: number) {
        super(200);
    }
}

class FirstStage extends Stage {
    constructor() {
        super([
            new Engine(1000),
            new Engine(1000),
            new Engine(1000),
            new Engine(1000)
        ]);
    }
}

class SecondStage extends Stage {
    constructor() {
        super([
            new Engine(1000)
        ]);
    }
}

type FreightRocketStages = [FirstStage, SecondStage];

class FreightRocketFactory extends RocketFactory {
    nextSatelliteId = 0;
    createPayload(): Satellite {
        return new Satellite(this.nextSatelliteId++);
    }
    
    createStages(): FreightRocketStages {
        return [
            new FirstStage(),
            new SecondStage()
        ];
    }
}

let rocketFactory = new RocketFactory();
rocketFactory.createStages();

let rocket = rocketFactory.buildRocket();
console.log(rocket.stages[0].engineArr);

let freightRocketFactory = new FreightRocketFactory();
freightRocketFactory.createPayload();
freightRocketFactory.createPayload();
let freightRocket =  freightRocketFactory.buildRocket();
console.log(freightRocket.payload)