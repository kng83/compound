import { EventEmitter } from 'events';

namespace ObserverPattern {

    type Observer = () => void;
    class StateManager extends EventEmitter {
        constructor(
            private state: any
        ) {
            super();
        }
        on(state: string, listener: Observer): this;
        on(states: string[], listener: Observer): this;
        on(states: string | string[], listener: Observer): this {
            if (typeof states === 'string') {
                super.on(states, listener);
            } else {
                for (let state of states) {
                    super.on(state, listener);
                }
            }
            return this;
        }


        private _get(identifiers: string[]): any {
            let node = this.state;
            for (let identifier of identifiers) {
                node = node[identifier];
            }
            return node;
        }

        get(key: string): any {
            let identifiers = key.split('.');
            return this._get(identifiers);
        }

        set(key: string, value: any): void {
            let identifiers = key.split('.');
            let lastIndex = identifiers.length - 1;
            let node = this._get(identifiers.slice(0, lastIndex));
            node[identifiers[lastIndex]] = value;

            for (let i = identifiers.length; i > 0; i--) {
                let key = identifiers.slice(0, i).join('.');
                this.emit(key);
            }

        }

    }


    let stateManager = new StateManager({
        connected: false,
        loaded: false,
        foo: 'abc',
        bar: 123
    });

    stateManager.emit('oko',10);
    console.log(stateManager);
}