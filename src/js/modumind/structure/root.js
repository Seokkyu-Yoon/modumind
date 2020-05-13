import Node from './node';
import { Direction, uuid } from '../util';

const DEFAULT_ROOT = {
  id: uuid.get(),
  parent: null,
  index: 0,
  direction: Direction.CENTER,
  expand: { left: true, right: true },
  title: 'Root Node',
  body: 'Root Node',
  children: [],
};

class Root extends Node {
  constructor(parameter = { children: [] }) {
    super({
      ...DEFAULT_ROOT,
      ...parameter,
      children: [],
    });
    this.isroot = true;

    parameter.children.map((child) => new Node({
      parent: this,
      ...child,
    }));
  }
}

export default Root;
