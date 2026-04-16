export class NaryNode {
    constructor(name, type, createdBy) {
    this.id = crypto.randomUUID();  
    this.name = name;        
    this.type = type;              
    this.createdBy = createdBy;    
    this.children = [];            
}

isLeaf() {
    return this.children.length === 0;
}

isFolder() {
    return this.type === "folder";
    }
}

export class NaryTree {
  constructor() {
    this.root = null;
  }

setRoot(name, type, createdBy) {
    if (this.root) return "El árbol ya tiene raíz";
    this.root = new NaryNode(name, type, createdBy);
    return this.root;
}

findById(id, node = this.root) {
    if (!node) return null;
    if (node.id === id) return node;

    for (const child of node.children) {
      const found = this.findById(id, child);
      if (found) return found;
    }
    return null;
}

addChild(parentId, name, type, createdBy) {
    const parent = this.findById(parentId);
     
    if (!parent) return { ok: false, msg: "Nodo padre no encontrado" };
    if (!parent.isFolder()) return { ok: false, msg: "Un archivo no puede contener elementos" };

    const newNode = new NaryNode(name, type, createdBy);
    parent.children.push(newNode);
    return { ok: true, node: newNode };
}

dfs(node = this.root, result = []) {
    if (!node) return result;
    result.push(node);
    for (const child of node.children) {
    this.dfs(child, result);
    }
    return result;
}

toJSON(node = this.root) {
if (!node) return null;
return {
    id: node.id,
    name: node.name,
    type: node.type,
    createdBy: node.createdBy,
    children: node.children.map((child) => this.toJSON(child)),
    };
}

fromJSON(data) {
    if (!data) return null;
    const node = new NaryNode(data.name, data.type, data.createdBy);
    node.id = data.id; // conserva el ID original
    node.children = data.children.map((child) => this.fromJSON(child));
    return node;
}

loadFromJSON(data) {
this.root = this.fromJSON(data);
}
}