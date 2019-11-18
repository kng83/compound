// As the Builder Pattern takes greater control of the product structures and how the building
// steps influence each other, it provides the maximum flexibility by subclassing the builder
// itself, without changing the director (which plays a similar role to a client in the Abstract
// Factory Pattern)


namespace Builder {

    //** Basic interfaces */
    interface Payload {
        weight: number;
    }

    interface Rocket {
        payload: Payload;
    }

    interface Stage {
        engines: Engine[];
    }

    class Engine {
        constructor(public power: number) { }
        fuelLever!: number;
    }

    // Probe to sonda
    class Probe implements Payload {
        weight!: number;
    }
    class Satellite implements Payload {
        constructor(
            public id: number,
            public weight: number
        ) { }
    }

    class SolidRocketEngine extends Engine { }

    class SoundingRocket implements Rocket {
        payload!: Probe;
        engine!: SolidRocketEngine;
    }

    class LiquidRocketEngine extends Engine {
        fuelLevel = 0;
        refuel(level: number): void {
            this.fuelLevel = level;
        }
    }
    abstract class LiquidRocketStage implements Stage {
        engines: LiquidRocketEngine[] = [];
        refuel(level = 100): void {
            for (let engine of this.engines) {
                engine.refuel(level);
            }
        }
    }

    class FreightRocketFirstStage extends LiquidRocketStage {
        constructor(thrust: number) {
            super();
            let enginesNumber = 4;
            let singleEngineThrust = thrust / enginesNumber;
            for (let i = 0; i < enginesNumber; i++) {
                let engine = new LiquidRocketEngine(singleEngineThrust);
                this.engines.push(engine);
            }
        }
    }

    class FreightRocketSecondStage extends LiquidRocketStage {
        constructor(thrust: number) {
            super();
            this.engines.push(new LiquidRocketEngine(thrust));
        }
    }

    type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

    class FreightRocket implements Rocket {
        payload!: Satellite;
        stages = [] as any as FreightRocketStages;
    }

    abstract class RocketBuilder<TRocket extends Rocket, TPayload extends Payload> {
        createRocket(): void { }
        addPayload(payload: TPayload): void { }
        addStages(): void { }
        refuelRocket(): void { }
        abstract get rocket(): TRocket;
    }

    // ** Director
    class Director {
        prepareRocket<TRocket extends Rocket, TPayload extends Payload>(builder: RocketBuilder<TRocket, TPayload>, payload: TPayload): TRocket {
            builder.createRocket();
            builder.addPayload(payload);
            builder.addStages();
            builder.refuelRocket();
            return builder.rocket;
        }
    }

    class SoundingRocketBuilder extends RocketBuilder<SoundingRocket, Probe> {
        private buildingRocket!: SoundingRocket;

        createRocket(): void {
            this.buildingRocket = new SoundingRocket();
        }
        addPayload(probe: Probe): void {
            this.buildingRocket.payload = probe;
        }
        addStages(): void {
            let payload = this.buildingRocket.payload;
            this.buildingRocket.engine = new SolidRocketEngine(payload.weight);
        }
        get rocket(): SoundingRocket {
            return this.buildingRocket;
        }
    }

    class FreightRocketBuilder extends RocketBuilder<FreightRocket, Satellite> {

        static oneStageMax = 1000;
        static twoStagesMax = 2000;

        private buildingRocket!: FreightRocket;

        createRocket(): void {
            this.buildingRocket = new FreightRocket();
        }
        addPayload(satellite: Satellite): void {
            this.buildingRocket.payload = satellite;
        }
        get rocket(): FreightRocket {
            return this.buildingRocket;
        }

        addStages(): void {
            let rocket = this.buildingRocket;
            let payload = rocket.payload;
            let stages = rocket.stages;
            stages[0] = new FreightRocketFirstStage(payload.weight * 4);

            if (payload.weight >= FreightRocketBuilder.oneStageMax) {
                stages[1] = new FreightRocketSecondStage(payload.weight);
            }
        }

        refuel(): void {
            let rocket = this.buildingRocket;
            let payload = rocket.payload;
            let stages = rocket.stages;
            let oneMax = FreightRocketBuilder.oneStageMax;
            let twoMax = FreightRocketBuilder.twoStagesMax;
            let weight = payload.weight;

            stages[0].refuel(Math.min(weight, oneMax) / oneMax * 100);

            if (weight >= oneMax) {
                stages[1].refuel((weight - oneMax) / (twoMax - oneMax) * 100);
            }
        }
    }

    //** End at last */

    let director = new Director();
    let soundingRocketBuilder = new SoundingRocketBuilder();

    let probe = new Probe();
    let soundingRocket = director.prepareRocket(soundingRocketBuilder, probe);

    let freightRocketBuilder = new FreightRocketBuilder();
    let satellite = new Satellite(0, 1200);

    let freightRocket = director.prepareRocket(freightRocketBuilder, satellite);

    console.log(soundingRocket);
    console.log(freightRocket);
}