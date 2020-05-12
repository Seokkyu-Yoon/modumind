import { uuid, Direction } from '../util';

class Node {
  constructor({
    parent,
    direction,
    id = uuid.get(),
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
    this.direction = parent === null ? direction : parent.getDirection(direction);
    this.expand = expand;
    this.title = title;
    this.body = body;
    this.children = children;

    if (parent !== null) {
      parent.children.push(this);
    }
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
      const remain = childrenLen - i - 1;
      if (left + remain < right) {
        return Direction.LEFT;
      }
      if (right + remain < left) {
        return Direction.RIGHT;
      }
    }
    return Direction.RIGHT;
  }
}

export default Node;
