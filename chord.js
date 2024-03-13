class Node {
    constructor(id) {
        this.id = id;
        this.successor = null;
        this.finger_table = {};
    }

    find_successor(key) {
        if (this.id === key) {
            return this; //retorna o id msm, caso seja igual a chave buscada
        }
        if (this.successor.id === key) {// verifica se o id do sucessor do nó atual é igual a key, pois, com isso sabe-se que o sucessor do nó atual é o desejado 
            return this.successor;
        }
        if (this.id < key && key < this.successor.id) {// verifica se está entre o id fornecido e o id sucessor com isso retornando o sucessor
            return this.successor;
        }

        let closest = this.closest_preceding_node(key);
        if (closest === this) { //verifica se o mais próximo precedente é o nó atual
            return this.successor.find_successor(key);// continua a busca no sucessor do nó atual 
        }
        return closest.find_successor(key); //busca no precedente mais próximo
    }

    closest_preceding_node(key) {
        for (let i = 30; i > 0; i--) {
            if (this.finger_table[i].id > this.id && this.finger_table[i].id < key) {// se o id da tabela de apontamento é maior q o id atual e menor que a chave então é o predecessor atual
                return this.finger_table[i];
            }
        }
        return this; //nenhum nó é um candidato válido a predecessor entao retorna o proprio nó atual
    }
}

class ChordRing {
    constructor() {
        this.nodes = {};
    }

    add_node(id) {
        let new_node = new Node(id);
        for (let i = 1; i <= 30; i++) {
            new_node.finger_table[i] = new_node;
        }
        new_node.successor = new_node;
        this.nodes[id] = new_node;
    }

    get_node(id) {
        return this.nodes[id];
    }
}


let chord_ring = new ChordRing();
chord_ring.add_node(8);
chord_ring.add_node(20);
chord_ring.add_node(30);

let node_8 = chord_ring.get_node(8);
let node_20 = chord_ring.get_node(20);
let node_30 = chord_ring.get_node(30);

node_8.successor = node_20;
node_20.successor = node_30;
node_30.successor = node_8;

let result = node_8.find_successor(16); //n funica com keys contidas no nó 8 pq ta errado o if do closest_preceding_node, arrumar
console.log(result.id); 