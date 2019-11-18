/*
The Abstract Factory Pattern makes it easy and smooth to change the entire family of
products. This is the direct benefit brought by the factory level abstraction. As a
consequence, it also brings other benefits, as well as some disadvantages at the same time
*/

namespace AbstractFactory {

    // ** Basic interfaces
    interface Payload {
        weight: number;
    }
    interface Stage {
        engines: Engine[];
    }
    interface Rocket {
        payload: Payload;
        stages: Stage[];
    }
    interface Engine {
        power: number
    }

    // ** Factory interface
    interface RocketFactory<T extends Rocket> {
        createRocket(): T;
        createPayload(): Payload;
        createStages(): Stage[];
    }

    // ** Extended Basic interfaces
    class ExperimentalPayload implements Payload {
        weight!: number;
    }

    class ExperimentalRocketStage implements Stage {
        engines!: Engine[];
    }

    class ExperimentalRocket implements Rocket {
        payload!: Payload;
        stages!: Stage[];
    }

    // ** Payloads
    class SatellitePayload implements Payload {
        constructor(
            public id: number,
            public weight: number
        ) { }
    }

    // ** Stages
    class FreightRocketFirstStage implements Stage {
        engines!: Engine[]; //! disable error
    }

    class FreightRocketSecondStage implements Stage {
        engines!: Engine[];
    }

    type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

    class FreightRocket implements Rocket {
        payload!: Satellite;
        stages!: FreightRocketStages;
    }

    //** Factories */
    class ExperimentalRocketFactory implements RocketFactory<ExperimentalRocket> {
        createRocket(): ExperimentalRocket {
            return new ExperimentalRocket();
        }
        createPayload(): ExperimentalPayload {
            return new ExperimentalPayload();
        }
        createStages(): [ExperimentalRocketStage] {
            return [new ExperimentalRocketStage()];
        }
    }


    class FreightRocketFactory implements RocketFactory<FreightRocket> {
        nextSatelliteId = 0;
        createRocket(): FreightRocket {
            return new FreightRocket();
        }
        createPayload(): SatellitePayload {
            return new SatellitePayload(this.nextSatelliteId++, 100);
        }
        createStages(): FreightRocketStages {
            return [
                new FreightRocketFirstStage(),
                new FreightRocketSecondStage()
            ];
        }
    }

    //** Factory Client */
    class Client {
        buildRocket<T extends Rocket>(factory: RocketFactory<T>): Rocket {
            let rocket = factory.createRocket();
            rocket.payload = factory.createPayload();
            rocket.stages = factory.createStages();
            return rocket;
        }
    }

    let client = new Client();
    let experimentalRocketFactory = new ExperimentalRocketFactory();
    let freightRocketFactory = new FreightRocketFactory();
    let experimentalRocket = client.buildRocket(experimentalRocketFactory);
    let freightRocket = client.buildRocket(freightRocketFactory);
    console.log(experimentalRocket);
    console.log(freightRocket);
}
