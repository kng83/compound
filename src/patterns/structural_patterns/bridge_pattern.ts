

interface UIToolkit {
    drawBorder(): void;
    drawImage(src: string): void;
    drawText(text: string): void;
}

//** Wymuszanie by klasa interfejsowa przyjmowala interfejs UIToolKit i metode dostepowo do niego render */
abstract class BasicRender {
    constructor(public toolkit: UIToolkit) { }
    abstract render(): void;
}

class TextElement extends BasicRender {
    constructor(public text: string, toolkit: UIToolkit) {
        super(toolkit);
    }

    render(): void {
        this.toolkit.drawText(this.text);
    }
}

class ImageElement extends BasicRender {
    constructor(public src: string, toolkit: UIToolkit) {
        super(toolkit);
    }
    render(): void {
        this.toolkit.drawImage(this.src);
    }
}


class Gui implements UIToolkit{
    drawBorder(): void {
        console.log("DrawBorder not Implemented");
    }    
    drawImage(src: string): void {
       console.log("Draw image Method not implemented.");
    }
    drawText(text: string): void {
        console.log("Draw TextMethod not implemented.");
    }
    some = 4;
}


let toolkit: UIToolkit = new Gui();

let imageElement = new ImageElement('foo.jpg', toolkit);
imageElement.render();
let textElement = new TextElement('bar', toolkit);
textElement.render();