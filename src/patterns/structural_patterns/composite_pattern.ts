
import Path from 'path';
import Fs from 'fs';

namespace CompositePattern {


    abstract class FileSystemObject {
        constructor(public selectedPath: string, public parent?: FileSystemObject) { }

        get basename(): string {
            return Path.basename(Path.resolve(this.selectedPath));
        }
    }

    class FileObject extends FileSystemObject {
        readAll(): Buffer {
            return Fs.readFileSync(Path.resolve(this.selectedPath));
        }
    }

    //** Ta klasa jest rekurencyjna */
    class FolderObject extends FileSystemObject {
        items: FileSystemObject[];
        constructor(selectedPath: string, parent?: FileSystemObject) {
            super(selectedPath, parent);
            this.items = Fs.readdirSync(this.selectedPath)
                .map(childPath => {
                    let computedPath = Path.join(this.selectedPath,childPath)
                    let stats = Fs.statSync(computedPath);
                    console.log('is this a file: ',stats.isFile(),'is this a directory: ', stats.isDirectory());
                    if (stats.isFile()) {
                        return new FileObject(Path.resolve(computedPath), this);
                    } else if (stats.isDirectory()) {
                        return new FolderObject(Path.resolve(computedPath), this);
                    } else {
                        throw new Error('Not supported');
                    }
                });
        }
    }

    let folderObject = new FolderObject("c:\\logs");
    
    console.log(folderObject.basename);
    console.log(folderObject.items[6]);
}