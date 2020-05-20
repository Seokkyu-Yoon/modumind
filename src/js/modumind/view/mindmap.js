import {
  $c,
  $d,
  $g,
  Direction,
} from '../util';
import Node from './node';
import eventHandler, { EventType } from '../event-handler';

const MARGIN = {
  HORIZONTAL: 50,
  VERTICAL: 100,
};

function setDisplay(node) {
  const nodeEl = $g(node.id);
  if (node.isroot) {
    Object.assign(node, { visible: true });
    nodeEl.style.display = 'flex';
    return;
  }
  const { parent } = node;
  let { expand } = parent;
  if (parent.isroot) {
    expand = parent.expand[node.direction];
  }
  const visible = expand && parent.visible;
  nodeEl.style.display = visible ? 'flex' : 'none';
  Object.assign(node, { visible });
}

function setHeight(node) {
  const nodeHeight = $g(node.id).offsetHeight;
  const reducer = (acc, child, index) => {
    setDisplay(child);
    return index > 0
      ? acc + setHeight(child) + MARGIN.HORIZONTAL
      : acc + setHeight(child);
  };
  if (node.isroot) {
    Object.assign(node, { visible: true });
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

function getExpanderInfo(children, expand, visible) {
  const display = children.length && visible ? 'flex' : 'none';
  const innerHTML = expand ? '+' : '-';
  return { display, innerHTML };
}

function showChild(node, parent) {
  const nodeEl = $g(node.id);
  const parentEl = $g(parent.id);
  const { index } = node;

  let top = parseFloat(parentEl.style.top) + parentEl.offsetHeight / 2;
  let { height, children, expand } = parent;
  if (parent.isroot) {
    height = height[node.direction];
    children = children[node.direction];
    expand = expand[node.direction];
  }
  top -= height / 2;
  const visible = expand && parent.visible;
  nodeEl.style.display = visible ? 'flex' : 'none';
  Object.assign(node, { visible });

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

  const expander = nodeEl.querySelector('expander');
  const expanderInfo = getExpanderInfo(node.children, node.expand, visible);
  expander.style.display = expanderInfo.display;
  expander.innerHTML = expanderInfo.innerHTML;
  node.children.forEach((child) => showChild(child, parent));
}

function show(root) {
  setHeight(root);
  const visible = true;
  const rootEl = $g(root.id);
  rootEl.style.left = `${($d.body.offsetWidth - rootEl.offsetWidth) / 2}px`;
  rootEl.style.top = `${($d.body.offsetHeight - rootEl.offsetHeight) / 2}px`;

  const [leftExpander, rightExpander] = rootEl.querySelectorAll('expander');
  const leftExpanderInfo = getExpanderInfo(
    root.children[Direction.LEFT],
    root.expand[Direction.LEFT],
    visible,
  );
  const rightExpanderInfo = getExpanderInfo(
    root.children[Direction.RIGHT],
    root.expand[Direction.RIGHT],
    visible,
  );
  leftExpander.style.display = leftExpanderInfo.display;
  leftExpander.innerHTML = leftExpanderInfo.innerHTML;
  rightExpander.style.display = rightExpanderInfo.display;
  rightExpander.innerHTML = rightExpanderInfo.innerHTML;
  Object.assign(root, { visible });
  root.getChildren().forEach((child) => showChild(child, root));
}

function addNode(mindmap, node) {
  if ($g(node.id) === null) {
    const nodeEl = new Node(node);
    mindmap.appendChild(nodeEl);
  }
  node.getChildren().forEach((child) => addNode(mindmap, child));
}

function Mindmap() {
  const mindmap = $c('mindmap');
  eventHandler.addEvent((type, data) => {
    if (type === EventType.ADD) {
      if (!data.root) return;
      addNode(mindmap, data.root);
    }
  });
  eventHandler.addEvent((type, data) => {
    if (type === EventType.SHOW) {
      show(data);
    }
  });
  return mindmap;
}

export default Mindmap;
