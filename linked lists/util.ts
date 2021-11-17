import { LinkedList } from './linked-list';

function reverseLinkedList<T>(sll: LinkedList<T>) {
    let node = sll.head;
    let prev = null;
    while (node) {
        let tmp = node.next;
        node.next = prev;
        prev = node;
        if (!tmp) {
            break;
        }
        node = tmp;
    }
    return node;
}

function removeDuplicatesInLinkedList<T>(sll: LinkedList<T>): LinkedList<T> {
    let collection = new Set<T>();

    if (sll.head === null) {
        return null;
    }
    let current = sll.head;
    let prev = sll.head;
    while (current) {
        if (collection.has(current.value)) {
            current = current.next;
            prev.next = current;
            //@ts-ignore
            sll._length--;
        } else {
            collection.add(current.value);
            prev = current;
            current = current.next;
        }
    }
    return sll;
}