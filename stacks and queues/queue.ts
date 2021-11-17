class Queue<T> {
    private _queue: T[];
    private _length: number;

    constructor(queue: T[] = []) {
        this._queue = queue;
        this._length = queue.length;
    }

    get isEmpty(): boolean {
        return this._length === 0;
    }

    get size(): number {
        return this._length;
    }

    get peek(): T {
        return this._queue[0];
    }

    enqueue(value: T): number {
        this._length++;
        this._queue.push(value);
        return this._length;
    }

    dequeue(): T | undefined {
        if (this._length > 0) {
            this._length--;
        }
        return this._queue.shift();
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
        return this._queue.slice();
    }
}