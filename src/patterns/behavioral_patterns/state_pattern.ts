import JQuery  from 'jQuery'

export namespace StatePattern {

    interface State {
        render(hover: boolean): void;
        click(): void;
    }

    class StateEnabled implements State {
        constructor(public context: Context) { }
        render(hover: boolean): void {
            console.log('enable is rendered')
            this.context
                .element
                .removeClass('disabled')
                .addClass('hover');
        }
        click(): void {
            this.context.onclick();
        }
    }

    class StateDisabled implements State {
        constructor( public context: Context) { }
        render(): void {
            console.log('disable is rendered')
            this.context
                .element
                .addClass('disabled')
                .removeClass('hover');
        }
        click(): void {
            // Do nothing.
        }
    }
    class Context{
        private stateEnabled:StateEnabled = new StateEnabled(this);
        private stateDisabled:StateDisabled = new StateDisabled(this);
        state!:State;

        constructor(public element:JQuery) {
            this.element.hover(() => this.render(true),() => this.render(false)).click(() => this.click());
            this.render(false);
        }

        private render(hover: boolean): void {
            this.state  = hover ? this.stateEnabled : this.stateDisabled;
            this.state.render(hover);
        }

        private click(): void {
            this.state.click();
        }
        onclick(): void {
            console.log('I am clicked.');
        }

    }

    let element = document.getElementById("par1") as HTMLElement;
    let context = new Context(JQuery(element));


}