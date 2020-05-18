import Node from './node';
import { Direction, uuid } from '../util';

function DefaultChildren() {
  const temp = {};
  temp[Direction.LEFT] = [];
  temp[Direction.RIGHT] = [];
  return temp;
}
const DEFAULT_ROOT = {
  id: uuid.get(),
  parent: null,
  direction: Direction.CENTER,
  index: 0,
  expand: { left: true, right: true },
  title: 'Root Node',
  body: 'Root Node',
  children: new DefaultChildren(),
};

class Root extends Node {
  constructor(parameter) {
    super({ ...DEFAULT_ROOT, ...parameter });
  }

  initChildren(children) {
    const rootChildren = {};
    rootChildren[Direction.LEFT] = children[Direction.LEFT]
      .map((child) => new Node({ ...child, parent: this }));
    rootChildren[Direction.RIGHT] = children[Direction.RIGHT]
      .map((child) => new Node({ ...child, parent: this }));
    this.children = rootChildren;
  }

  getChildren(direction) {
    let { children } = this;
    if (typeof direction !== 'undefined') {
      children = this.children[direction];
    } else {
      children = [
        ...this.children[Direction.LEFT],
        ...this.children[Direction.RIGHT],
      ];
    }
    return children.reduce((bucket, child) => [
      child,
      ...bucket,
      ...child.getChildren(direction),
    ], []);
  }

  removeChild(node) {
    const { children } = this;
    const { index, direction } = node;
    children[direction].splice(index, 1);
    for (let i = index; i < children[direction].length; i += 1) {
      Object.assign(children[direction][i], { index: i });
    }
  }

  addChild(child) {
    const { children } = this;
    const { index, direction } = child;
    children[direction].splice(child.index, 0, child);
    for (let i = index; i < children[direction].length; i += 1) {
      Object.assign(children[direction][i], { index: i });
    }
  }

  hasChildren(node) {
    return this.children[node.direction].includes(node);
  }
}

export default Root;
