export class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList<T> {
    head: LinkedListNode<T> | null;
    private _length: number;

    constructor(value: T | null = null) {
        this.head = value !== null ? new LinkedListNode(value) : null;
        this._length = value !== null ? 1 : 0;
    }
    
    insert(value: T): void {
        if (this.head === null) {
            this.head = new LinkedListNode(value);
        } else {
            let node = new LinkedListNode(value, this.head);
            this.head = node;
        }
        this._length++;
    }

    remove(value: T): T | undefined {
        if (this.head === null) {
            return;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
            this._length--;
        } else {
            let currentHead = this.head;
            let node = currentHead;
            while(currentHead.next) {
                if (currentHead.value === value) {
                    node.next = currentHead.next;
                    break;
                }
                node = currentHead;
                currentHead = currentHead.next;
            }

            if (currentHead.value === value) {
                this._length--;
            }
        }
    }

    remove(value: T): LinkedListNode<T> | undefined {
        if (this.head === null) {
            return;
        }
        let cur = this.head;
        if (cur.value === value) {
            this.head = cur.next;
            this._length--;
            return cur;
        }
        let prev = cur;
        while (cur) {
            if (cur.value === value) {
                prev.next = cur.next;
                this._length--;
                return cur;
            }
            prev = cur;
            cur = cur.next;
        }
    }

    removeAtHead(): T | undefined {
        if (this.head === null) {
            return;
        }
        let returnVal = this.head.value;
        this.head = this.head.next;
        this._length--;
        return returnVal;
    }

    get isEmpty(): boolean {
        return this._length === 0;
    }

    get size(): number {
        return this._length;
    }
}