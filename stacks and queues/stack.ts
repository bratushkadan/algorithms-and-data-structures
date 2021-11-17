class Stack<T> {
    private _stack: T[];
    private _length: number;

    constructor(stack: T[] = []) {
        this._stack = stack;
        this._length = stack.length;
    }

    get isEmpty(): boolean {
        return this._length === 0;
    }

    get size(): number {
        return this._length;
    }

    get peek(): T {
        return this._stack[this._stack.length - 1];
    }

    insert(value: T): number {
        this._length++;
        this._stack.push(value);
        return this._length;
    }

    pop(): T | undefined {
        if (this._length > 0) {
            this._length--;
        }
        return this._stack.pop();
    }

    accessNthTopNode(n: number): T | undefined {
        let bufferStack = new Stack(this._getBuffer());
        if (n <= 0 || n > bufferStack.size) throw new RangeError('');

        while (--n !== 0) {
            bufferStack.pop();
        }
        return bufferStack.pop();
    }

    search(value: T): boolean {
        let bufferStack = new Stack(this._getBuffer());

        while (!bufferStack.isEmpty) {
            if (bufferStack.pop() === value) {
                return true;
            }
        }
        return false;
    }

    private _getBuffer(): T[] {
        return this._stack.slice();
    }
}