/**
 * Breadth first search is a different kind of search algorithm: one that runs on
 * graphs. It can help answer two types of questions:
 * • Question type 1: Is there a path from node A to node B?
 * • Question type 2: What is the shortest path from node A to node B?
 * The way breadth-first search works, the search radiates out from the starting
 * point. So you’ll check first-degree connections before second-degree
 * connections.
 * */

class Queue {
    #list = [];
    #capacity = null;
    #tail = 0;
    #head = 0;

    constructor(capacity) {
        this.#capacity = Math.max(Number(capacity), 0) || null;

        if (this.#capacity) {
            this.#list = Array.from({length: this.#capacity});
        }
    }

    get size() {
        return this.#tail - this.#head;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get isFull() {
        return this.#capacity && this.#tail === this.#capacity;
    }

    enqueue(item) {
        if (!this.isFull) {
            this.#list[this.#tail] = item;
            this.#tail += 1;
        }

        return this.size;
    }

    dequeue() {
        let item = null;

        if (!this.isEmpty) {
            item = this.#list[this.#head];
            delete this.#list[this.#head];

            this.#head += 1;

            if (this.isEmpty) {
                this.#head = 0;
                this.#tail = 0;
            }
        }

        return item;
    }

    addItems(arr) {
        arr.forEach(item => this.enqueue(item))

        return this.size;
    }

    peek() {
        if (this.isEmpty) {
            return null;
        }

        return this.#list[this.#head];
    }

    clear() {
        if (this.#capacity) {
            this.#list = Array.from({length: this.#capacity});
        } else {
            this.#list = [];
        }

        this.#head = 0;
        this.#tail = 0;
    }

    print() {
        const list = [];

        this.#list.forEach(item => {
            list.push(item);
        })

        console.log(list)
    }

    toString() {
        if (this.isEmpty) {
            return '';
        }

        let str = `${this.#list[this.#head]}`;

        for (let i = this.#head + 1; i < this.#tail; i++) {
            str += `, ${this.#list[i]}`;
        }

        return str;
    }
}

const graph = {}

graph['you'] = ['alice', 'bob', 'claire']
graph['bob'] = ['anuj', 'peggy']
graph['alice'] = ['peggy']
graph['claire'] = ['thom', 'jonny']
graph['anuj'] = []
graph['peggy'] = []
graph['thom'] = []
graph['jonny'] = []

const search = (name) => {
    const searchQueue = new Queue()
    searchQueue.addItems(graph[name])
    const searched = [name]

    while (!searchQueue.isEmpty) {
        const person = searchQueue.dequeue()
        if (!searched.includes(person)) {
            if (personIsSeller(person)) {
                console.log(`${person} is a mango seller!`)
                return true
            }
            searchQueue.addItems(graph[person])
            searched.push(person)
        }
    }
    return false
}

console.log(search('you'))

function personIsSeller(name) {
    return name.slice(-1) === 'm'
}