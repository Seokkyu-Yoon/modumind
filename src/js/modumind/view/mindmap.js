import {
  $c,
  $d,
  $g,
  Direction,
} from '../util';
import Node from './node';

const MARGIN = {
  HORIZONTAL: 50,
  VERTICAL: 100,
};

function setHeight(node) {
  const nodeHeight = $g(node.id).offsetHeight;
  const reducer = (acc, child, index) => (
    index > 0
      ? acc + setHeight(child) + MARGIN.HORIZONTAL
      : acc + setHeight(child)
  );
  if (node.isroot) {
    const childrenHeightLeft = node.children[Direction.LEFT].reduce(reducer, 0);
    const childrenHeightRight = node.children[Direction.RIGHT].reduce(reducer, 0);

    const height = {};
    height[Direction.LEFT] = Math.max(nodeHeight, childrenHeightLeft);
    height[Direction.RIGHT] = Math.max(nodeHeight, childrenHeightRight);
    Object.assign(node, { height });
    return height;
  }

  const childrenHeight = node.children.reduce(reducer, 0);
  const height = Math.max(nodeHeight, childrenHeight);
  Object.assign(node, { height });
  return height;
}

function drawChild(node, parent) {
  const nodeEl = $g(node.id);
  const parentEl = $g(parent.id);
  const { index } = node;

  let top = parseFloat(parentEl.style.top) + parentEl.offsetHeight / 2;
  let { height, children } = parent;
  if (parent.isroot) {
    height = height[node.direction];
    children = children[node.direction];
  }
  top -= height / 2;
  for (let i = 0; i < index; i += 1) {
    top += children[i].height + MARGIN.HORIZONTAL;
  }
  top += (node.height - nodeEl.offsetHeight) / 2;
  let left = parseFloat(parentEl.style.left) + node.direction * MARGIN.VERTICAL;
  if (node.direction === Direction.RIGHT) {
    left += parentEl.offsetWidth;
  }
  if (node.direction === Direction.LEFT) {
    left -= nodeEl.offsetWidth;
  }
  nodeEl.style.left = `${left}px`;
  nodeEl.style.top = `${top}px`;

  node.children.forEach((child) => drawChild(child, parent));
}

function draw({ root }) {
  setHeight(root);
  const rootEl = $g(root.id);
  rootEl.style.left = `${($d.body.offsetWidth - rootEl.offsetWidth) / 2}px`;
  rootEl.style.top = `${($d.body.offsetHeight - rootEl.offsetHeight) / 2}px`;

  root.getChildren().forEach((child) => drawChild(child, root));
}

function addNode(node) {
  const nodeEl = new Node(node);
  this.appendChild(nodeEl);
  return nodeEl;
}

function Mindmap() {
  const mindmap = $c('mindmap');
  mindmap.draw = draw;
  mindmap.addNode = addNode;
  return mindmap;
}

export default Mindmap;
