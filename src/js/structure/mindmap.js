import Node from './node';
import { Direction, uuid } from '../util';

function removeParent(node) {
  const fixedNode = {
    isroot: node.isroot,
    id: node.id,
    direction: node.direction,
    expand: node.expand,
    title: node.title,
    body: node.body,
    children: node.children.map(removeParent),
  };
  fixedNode.children = node.children.map(removeParent);
  return fixedNode;
}

function addParent(parent, node) {
  const fixedNode = new Node({
    isroot: node.isroot,
    id: node.id,
    parent,
    direction: node.direction,
    expand: node.expand,
    title: node.title,
    body: node.body,
  });
  fixedNode.children = node.children.map((child) => addParent(fixedNode, child));
  return fixedNode;
}

class Mindmap extends Node {
  constructor(parameter) {
    const parent = null;
    const obj = parameter || {};
    super({
      id: obj.id || uuid.get(),
      parent,
      direction: obj.direction || Direction.CENTER,
      expand: obj.expand || { left: true, right: true },
      title: obj.title || 'Root Node',
      body: obj.body || 'Root Node',
      children: obj.children || [],
    });
    this.isroot = true;

    this.setMindMap();
  }

  setMindMap() {
    this.children = this.children.map((child) => addParent(this, child));
  }

  getMindMap() {
    return JSON.stringify(removeParent(this), null, 2);
  }

  static isNode(node) {
    return node instanceof Node;
  }
}

export default Mindmap;
