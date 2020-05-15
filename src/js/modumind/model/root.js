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
}

export default Root;
