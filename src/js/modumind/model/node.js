import { uuid, Direction } from '../util';

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
    if (this.isroot) {
      const rootChildren = {};
      rootChildren[Direction.LEFT] = children[Direction.LEFT]
        .map((child) => new Node({ ...child, parent: this }));
      rootChildren[Direction.RIGHT] = children[Direction.RIGHT]
        .map((child) => new Node({ ...child, parent: this }));
      this.children = rootChildren;
    } else {
      this.children = children.map((child) => new Node({ ...child, parent: this }));
    }
  }

  addChild(child) {
    let { children } = this;
    if (this.isroot) {
      children = this.children[child.direction];
    }

    children.splice(child.index, 0, child);
    for (let { index } = child; index < children.length; index += 1) {
      Object.assign(children[index], { index });
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

  getChildren(direction) {
    let { children } = this;
    if (this.isroot) {
      if (typeof direction !== 'undefined') {
        children = this.children[direction];
      } else {
        children = [
          ...this.children[Direction.LEFT],
          ...this.children[Direction.RIGHT],
        ];
      }
    }
    return children.reduce((bucket, child) => [
      child,
      ...bucket,
      ...child.getChildren(direction),
    ], []);
  }

  removeToParent() {
    if (this.parent.isroot) {
      this.parent.children[this.direction].splice(this.index, 1);
      for (let { index } = this; index < this.parent.children[this.direction].length; index += 1) {
        Object.assign(this.parent.children[this.direction][index], { index });
      }
      return;
    }
    this.parent.children.splice(this.index, 1);
    for (let { index } = this; index < this.parent.children.length; index += 1) {
      Object.assign(this.parent.children[index], { index });
    }
  }

  hasChildren(node) {
    if (this.isroot) return this.children[node.direction].includes(node);
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
