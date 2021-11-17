type DoublyLinkedListPointers<T> = {
    next?: DoublyLinkedListNode<T> | null;
    prev?: DoublyLinkedListNode<T> | null;
}

class DoublyLinkedListNode<T> {
    value: T;
    prev: DoublyLinkedListNode<T> | null;
    next: DoublyLinkedListNode<T> | null;
    constructor(value: T, { prev = null, next = null }: DoublyLinkedListPointers<T> = { prev: null, next: null}) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList<T> {
    head: DoublyLinkedListNode<T> | null;
    tail: DoublyLinkedListNode<T> | null;
    private _length: number;

    constructor(headValue: T | null = null, tailValue: T | null = null) {
        this.head = headValue ? new DoublyLinkedListNode(headValue) : null;
        this.tail = tailValue ? new DoublyLinkedListNode(tailValue) : null;
        this._length = (headValue !== null ? 1 : 0) + (tailValue !== null ? 1 : 0);
    }
    
    insertAtHead(value: T): void {
        if (this.head === null && this.tail === null) {
            this.head = new DoublyLinkedListNode(value);
            this.tail = this.head;
        } else {    
            let node = new DoublyLinkedListNode(value);
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this._length++;
    }

    insertAtTail(value: T): void {
        if (this.head === null && this.tail === null) {
            this.head = new DoublyLinkedListNode(value);
            this.tail = this.head;
        } else {
            let node = new DoublyLinkedListNode(value);
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this._length++;
    }

    removeAtHead(): T | undefined {
        if (this.head === null) {
            return;
        }
        let returnVal = this.head.value;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this._length--;
        return returnVal;
    }

    removeAtTail(value: T): T | undefined {
        if (this.tail === null) {
            return;
        }
        let returnVal = this.tail.value;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this._length--;
        return returnVal;
    }

    search(value: T): boolean {
        let node = this.head;
        while (node) {
            if (node.value === value) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    get isEmpty(): boolean {
        return this._length === 0;
    }

    get size(): number {
        return this._length;
    }
}