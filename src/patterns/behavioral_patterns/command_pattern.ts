//** Command pattern pokazuje jak mozna by bylo sterowac obiektem przez zdarzenia */

namespace CommandPattern {

    class TextContext {
        content = 'text content';
    }
    
    abstract class TextCommand {
        constructor(public context: TextContext) { }
        abstract execute(...args: any[]): void;
    }


    class ReplaceCommand extends TextCommand {
        execute(index: number, length: number, text: string): void {
            let content = this.context.content;
            this.context.content = content.substr(0, index) + text + content.substr(index + length);
        }
    }

    class InsertCommand extends TextCommand {
        execute(index: number, text: string): void {
            let content = this.context.content;
            this.context.content = content.substr(0, index) + text + content.substr(index);
        }
    }

      //dodatkowo dodane makro komand

      interface TextCommandInfo {
        command: TextCommand,
        args: any[];
    }
    
    class MacroTextCommand {
        constructor(public infos: TextCommandInfo[]) { }
        execute(): void {
            for (let info of this.infos) {
                info.command.execute(...info.args);
            }
        }
    }

    // ** Client posredniczy w dostepie do komend. Jest wspolna zmienna na ktore wykonywane sa polecenia zwiazane z testem.
    class Client {
        private context = new TextContext();
        private macroText!:TextCommandInfo[];

        replaceCommand = new ReplaceCommand(this.context);
        insertCommand = new InsertCommand(this.context);
        macroCommand =  new MacroTextCommand(this.macroText)

        getContext() {
            return this.context;
        }
    }

  
    let client = new Client();
    console.log(client.getContext()); //TextContext { content: 'text content' }
    client.insertCommand.execute(0, 'some new text ');
    console.log(client.getContext()); // TextContext { content: 'some new text text content' }
    client.replaceCommand.execute(0, 5, 'bobo to kot ');
    console.log(client.getContext()) //  TextContext { content: 'bobo to kot new text text content' }
}