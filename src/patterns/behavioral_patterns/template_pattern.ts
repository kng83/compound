import * as FS from 'fs';
import  request from 'request';
import path from 'path';


// Bazowa klasa to TextReader z niej sa robione specjalizowane subklasa wykorzystujaca znaki Ascii. Na podstawie tej klasy sa robione
// klasy do czytania stron internetowych i do czytania plikow. Wszystkie dzieki dziedziczeniu moga korzystac z z funkcji decodeBytesToString
//i otrzymujemy tekst.

namespace TemplatePattern {


    // na podstawie abstrakcyjnych metod jest dostep do nich z wyzszego poziomu. Wlasciwa jest tu funkcja readAllText
    // ktora wiadomo ze dostatnie bajty i skonwertuje je na text
    
    abstract class TextReader {
        async readAllText(): Promise<string> {
            let bytes = await this.readAllBytes();
            let text = this.decodeBytesToString
            (bytes);
            return text;
        }

        abstract async readAllBytes(): Promise<Buffer>;
        abstract decodeBytesToString
        (bytes: Buffer): string;
    }

    abstract class AsciiTextReader extends TextReader {
        decodeBytesToString
        (bytes: Buffer): string {
            return bytes.toString('ascii'); //konwersja buffer do string
        }
    }

    class FileAsciiTextReader extends AsciiTextReader {
        constructor(public path: string) {
            super();
        }

        async readAllBytes(): Promise<Buffer> {
            return new Promise<Buffer>((resolve, reject) => {
                FS.readFile(this.path, (error, bytes) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(bytes);
                    }
                });
            });
        }


    }

    class HttpAsciiTextReader extends AsciiTextReader {
        constructor( public url: string) {
            super();
        }
        async readAllBytes(): Promise<Buffer> {
            return new Promise<Buffer>((resolve, reject) => {
                request(this.url, { encoding: null}, (error, bytes, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
                });
            });
        }
    }

    let httpAsciiTextReader = new HttpAsciiTextReader('http://gosiakenig.pl');
    httpAsciiTextReader.readAllText().then(value => console.log(value)); // read wp.pl
    let fileAsciiTextReader = new FileAsciiTextReader(path.join(__dirname,'../../../theme.css'));
    fileAsciiTextReader.readAllText().then(value=>console.log(value)); //read theme.css

}