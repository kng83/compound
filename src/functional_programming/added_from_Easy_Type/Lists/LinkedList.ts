
namespace LinkedListExample {
    //** Types to handle linked list */
    type Nil = undefined | null;

    interface INode<T> {
        value: T;
        next?: INode<T> | Nil;
    };

    type INodeType<T> = INode<T> | Nil;

    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        return?(value?: any): IteratorResult<T>;
        throw?(e?: any): IteratorResult<T>;
    }


    class LinkedList<T> {
        private head!: INode<T>;
        private tail!: INode<T>;

        public append = (value: T): LinkedList<T> => {
            const node = this.forgeNode(value);

            if (this.isEmpty()) {
                this.head = node;
                this.tail = node;
                return this;
            }

            this.appendToTheEndOfTheList(node);
            return this;
        };

        //** This function return false when list ends */
        public isEmpty = () => !this.head;

        //** Push list to array */
        public toArray = (): T[] => {
            const result: T[] = [];
            let node = this.head;
            while (node) {
                result.push(node.value);
                node = node.next as INode<T>;

            }
            return result;
        };

        //**Make list from array */
        public fromArray = (values: T[]): LinkedList<T> => {
            values.forEach(v => this.append(v));
            return this;
        };

        private itemsRefHolder!: Generator<INode<T>>;
        public get items() {
            return this.itemsRefHolder ? this.itemsRefHolder : this.itemsRefHolder = this.itemsGen();
        };

        //** iteration through items */
        private *itemsGen() {
            let node = this.head;
            while (node) {
                yield node;
                node = node.next as INode<T>
            }
        };

        //** Add element to the list at last position */
        private appendToTheEndOfTheList = (node: INode<T>) => {
            this.tail.next = node;
            this.tail = node;
        };

        //** Make new element in list (forge to kuznia) */ 
        private forgeNode = (value: T): INode<T> => {
            return { value, next: null };
        };
    }

    let someObjArr: { name: string, age: number }[] = [{ name: 'pawel', age: 36 }, { name: 'bobo', age: 4 }, { name: 'okon', age: 42 }];
    let makeSomeExample = new LinkedList<{ name: string, age: number }>()
    let some = makeSomeExample.fromArray(someObjArr);
    console.log(some.items.next(), some.items.next(), some.items.next(), some.items.next());
}
