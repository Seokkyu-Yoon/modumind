import { uuid, Direction, logger } from '../util';

class Node {
  constructor({
    id = uuid.get(),
    parent,
    index = -1,
    direction,
    expand = true,
    title = 'New Node',
    body = 'New Node',
    children = [],
  }) {
    if (typeof parent === 'undefined') {
      throw Error('node parent must not undefined');
    }
    this.isroot = parent === null;
    this.id = id;
    this.parent = parent;
    this.direction = parent === null ? direction : parent.getDirection(direction);
    this.index = this.getIndex(index);
    this.expand = expand;
    this.title = title;
    this.body = body;
    this.initChildren(children);
  }

  initChildren(children) {
    this.children = children.map((child) => new Node({ ...child, parent: this }));
  }

  addChild(child) {
    const { children } = this;
    const { index } = child;
    children.splice(index, 0, child);
    for (let i = index; i < children.length; i += 1) {
      Object.assign(children[i], { index: i });
    }
  }

  getIndex(index) {
    if (index > -1) return index;
    if (this.parent.isroot) {
      return this.parent.children[this.direction].length;
    }
    return this.parent.children.length;
  }

  getDirection(direction) {
    if (!this.isroot) return this.direction;
    if (direction) return direction;
    if (this.direction !== Direction.CENTER) return this.direction;

    const nodeLengthLeft = this.children[Direction.LEFT].length;
    const nodeLengthRight = this.children[Direction.RIGHT].length;
    if (nodeLengthLeft < nodeLengthRight) return Direction.LEFT;
    return Direction.RIGHT;
  }

  getChildren() {
    return this.children;
  }

  removeChild(node) {
    const { children } = this;
    const { index } = node;
    children.splice(index, 1);
    for (let i = index; i < children.length; i += 1) {
      Object.assign(children[i], { index: i });
    }
  }

  removeFromParent() {
    if (this.isroot) {
      logger.warn('root node doesn\'t have parent');
      return;
    }
    this.parent.removeChild(this);
  }

  hasChildren(node) {
    return this.children.includes(node);
  }

  getFrontCount() {
    if (this.isroot) return 0;
    const currDirection = this.direction;
    let count = 0;
    for (let i = 0; this !== this.parent.children[i]; i += 1) {
      if (this.parent.children[i].direction === currDirection) {
        count += 1;
      }
    }
    return count;
  }

  static isNode(node) {
    return node instanceof Node;
  }
}

export default Node;
