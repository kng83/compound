namespace StrategyPattern {

    type TargetType = 'a' | 'b';

    interface Target {
        type: TargetType;

    }

    interface TargetA extends Target {
        type: 'a';
        result: string;
    }
    interface TargetB extends Target {
        type: 'b';
        value: number;
    }

    type TargetS = TargetA | TargetB;

    interface Strategy<TTarget extends Target> {
        operationX(target: TTarget): void;
        operationY(target: TTarget): void;
    }

    let strategyA: Strategy<TargetA> = {

        operationX(target) {
            target.result = target.result + target.result;

        },
        operationY(target) {
            target.result = target.result
                .substr(Math.floor(target.result.length / 2));

        }
    };

    let strategyB: Strategy<TargetB> = {
        operationX(target) {
            target.value = target.value * 2;
        },
        operationY(target) {
            target.value = Math.floor(target.value / 2);
        }
    };

    //** Put strategies to hash table */
    let strategies: { [type: string]: Strategy<Target> } = {
        a: strategyA,
        b: strategyB
    };

    let targets: TargetS[] = [
        { type: 'a' , result:'some' },
        { type: 'a' , result:'dome' },
        { type: 'b' , value:10}
    ];

    for (let target of targets) {
        let strategy = strategies[target.type];
        //    strategy.operationX(target);
            strategy.operationY(target);
    }
    console.log(targets);
}