
abstract class UIComponent {
    abstract draw(): void;
    }
    
    class BasicText {
      content: string='';
      setColor(color: string): void { }
      setFont(font: string): void { }
      draw(): void { }
    }
    
    class Decorator extends UIComponent {
      constructor(public component: TextComponent) {
        super();
    }
      get texts(): BasicText[] {
        return this.component.texts;
    }
      draw(): void {
      this.component.draw();
      }
    }
    
    class TextComponent extends UIComponent {
      texts: BasicText[] = [];
      draw(): void {
        for (let text of this.texts) {
        text.draw();
        }
      }
    }
    
    class ColorDecorator extends Decorator {
    constructor(component: TextComponent,public color: string) {
      super(component);
    }
    draw(): void {
      for (let text of this.texts) {
      text.setColor(this.color);
      }
      super.draw();
      }
    }
    
    let decoratedComponent = new ColorDecorator( new TextComponent(),'black');
    console.log(decoratedComponent.color);
    let txt = new BasicText();
    txt.content = 'jakis cyrk'
    decoratedComponent.component.texts = [txt];
    decoratedComponent.draw();
    console.log(decoratedComponent.texts[0].content);