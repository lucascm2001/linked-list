// eslint-disable-next-line import/extensions
import { LinkedList } from './linked-list.js';

class HashMap {
  constructor() {
    this.size = 16;
    this.buckets = new Array(this.size).fill().map(() => new LinkedList(null));
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }
    return hashCode;
  }

  set(key, value) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    // node found
    if (bucket.find(key) !== null && bucket.find(key).value.key === key) {
      bucket.find(key).value.value = value;
    } else bucket.append({ key, value }); // node not found
  }

  get(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    if (bucket.find(key) !== null) {
      return bucket.find(key).value.value;
    }
    return null;
  }

  has(key) {
    if (this.get(key) !== null) {
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    if (bucket.find(key) !== null && bucket.find(key).value.key === key) {
      const index = bucket.index(key);
      bucket.removeAt(index);
      return true;
      // need index to use remove
    }
    return false;
  }

  length() {
    return this.buckets.reduce((acc, curr) => acc + curr.size(), 0);
  }

  clear() {
    this.buckets = this.buckets.map(() => new LinkedList(null));
  }

  keys() {
    const keyArray = [];
    this.buckets.forEach((ll) => {
      if (ll !== null) {
        // go through linked list and get all keys
        let curr = ll.head;
        while (curr !== null) {
          keyArray.push(curr.value.key);
          curr = curr.nextNode;
        }
      }
    });
    return keyArray;
  }

  values() {
    const valueArray = [];
    this.buckets.forEach((ll) => {
      if (ll !== null) {
        // go through linked list and get all keys
        let curr = ll.head;
        while (curr !== null) {
          valueArray.push(curr.value.value);
          curr = curr.nextNode;
        }
      }
    });
    return valueArray;
  }

  entries() {
    return this.keys().map((val, index) => [val, this.values()[index]]);
  }
}

/*
if (index < 0 || index >= buckets.length) {
  throw new Error('Trying to access index out of bound');
}
*/
// buckets holds linkedList with key value hash and value of the kv object

const h = new HashMap();
h.set('a', 'b');
h.set('q', 'meep');
console.log(h.length());
console.log(h.keys());
console.log(h.values());
console.log(h.entries());
console.log(h.has('q'));
h.buckets.forEach((val) => console.log(val));
