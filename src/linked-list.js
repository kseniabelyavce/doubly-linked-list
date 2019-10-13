const Node = require('./node');

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    const newNode = new Node(data, this._tail);

    if (this._tail) {
      this._tail.next = newNode;
    }
    if (!this._head) {
      this._head = newNode;
    }

    this._tail = newNode;
    this.length++;

    return this;
  }

  head() {
    return this._head && this._head.data;
  }

  tail() {
    return this._tail && this._tail.data;
  }

  at(index) {
    if (index > -1 && index < this.length) {
      let currNode = this._head;

      while (index--) {
        if (currNode.next) {
          currNode = currNode.next;
        }
      }

      return currNode !== null ? currNode.data : undefined;
    }

    return null;
  }

  insertAt(index, data) {
    if (index > 0 && index > this.length) {
      return false;
    } else {
      let node = new Node(data);
      let prev;
      let current = this._head;

      if (index == 0) {
        node.next = this._head;
        this._head = node;
      } else {
        current = this._head;
        let it = 0;

        while (it < index) {
          it++;
          prev = current;
          current = current.next;
        }

        node.next = current;
        prev.next = node;
      }

      this.length++;
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    if (this._head && index > -1 && index < this.length) {
      if (index === 0) {
        if (this.length === 1) {
          this._head = null;
          this._tail = null;
        } else {
          this._head = this._head.next;
          this._head.prev = null;
        }
      } else if (index === this.length - 1) {
          this._tail.prev.next = null;
      } else {
        let currNode = this._head;

        while (index--) {
          currNode = currNode.next;
        }

        [currNode.prev.next, currNode.next.prev] = [
          currNode.next,
          currNode.prev
        ];
      }
      this.length--;
    }

    return this;
  }

  reverse() {
    this._tail = this._head;
    let currNode = this._tail;

    while (currNode) {
      [currNode.prev, currNode.next] = [currNode.next, currNode.prev];

      if (currNode.prev) {
        currNode = currNode.prev;
      } else break;
    }

    this._head = currNode;

    return this;
  }

  indexOf(data) {
    let count = 0;
    let current = this._head;

    while (current != null) {
      if (current.data === data) {
        return count;
      }
      count++;
      current = current.next;
    }
    return -1;
  }
}

module.exports = LinkedList;
