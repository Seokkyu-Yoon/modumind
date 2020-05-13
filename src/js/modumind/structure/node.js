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
    this.isroot = false;
    this.id = id;
    this.parent = parent;
    this.index = this.getIndex(index);
    this.direction = parent === null ? direction : parent.getDirection(direction);
    this.expand = expand;
    this.title = title;
    this.body = body;
    this.children = [];

    if (parent !== null) {
      parent.children.splice(this.index, 0, this);
      for (let i = this.index + 1; i < parent.children.length; i += 1) {
        Object.assign(parent.children[i], { index: i });
      }
    }
    children.map((child) => new Node({
      ...child,
      parent: this,
    }));
  }

  getIndex(index) {
    if (index > -1) return index;
    return this.parent.children.length;
  }

  getDirection(direction) {
    if (!this.isroot) return this.direction;
    if (direction) return direction;
    if (this.direction !== Direction.CENTER) return this.direction;

    const childrenLen = this.children.length;
    let left = 0;
    let right = 0;
    for (let i = 0; i < childrenLen; i += 1) {
      const child = this.children[i];
      if (child.direction === Direction.LEFT) {
        left += 1;
      }
      if (child.direction === Direction.RIGHT) {
        right += 1;
      }
      /**
       * Loggical stop position definition
       *
       Constants
       * left = count of direction.LEFT children
       * right = count of direction.RIGHT children
       * right + left = i + 1
       * remain = length - (i + 1)
       *
       Default logic
       * remain + left < right ==> Direction.LEFT
       * remain + right < left ==> Direction.RIGHT
       *
       LEFT define
       * length - (i + 1) + (i + 1) - right < right ==> Direction.LEFT
       * length < 2 * right ==> Direction.LEFT
       *
       RIGHT define
       * length - (i + 1) + (i + 1) - left < left ==> Direction.RIGHT
       * length < 2 * left ==> Direction.RIGHT
       */
      if (childrenLen < 2 * right) {
        return Direction.LEFT;
      }
      if (childrenLen < 2 * left) {
        return Direction.RIGHT;
      }
    }
    // if same left and right return Direction.RIGHT
    return Direction.RIGHT;
  }

  getChildren() {
    return this.children.reduce((bucket, child) => [
      child,
      ...bucket,
      ...child.getChildren(),
    ], []);
  }

  remove() {
    this.parent.children.splice(this.index, 1);
    for (let { index } = this; index < this.parent.children.length; index += 1) {
      Object.assign(this.parent.children[index], { index });
    }
  }

  static isNode(node) {
    return node instanceof Node;
  }
}

export default Node;
