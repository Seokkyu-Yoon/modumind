import { $c, $g, Direction } from '../util';
import Node from './node';

const MARGIN = {
  HORIZONTAL: 50,
  VERTICAL: 100,
};

function addNode(node) {
  const nodeEl = new Node(node);
  this.appendChild(nodeEl);
}

function draw(nodeModel) {
  const nodeEl = $g(nodeModel.id);
  if (nodeModel.isroot) {
    nodeEl.style.left = `${-nodeEl.offsetWidth / 2}px`;
    nodeEl.style.top = `${-nodeEl.offsetHeight / 2}px`;
    return;
  }
  const { parent } = nodeModel;
  const parentEl = $g(parent.id);
  const parentLeft = parseFloat(parentEl.style.left);
  const parentTop = parseFloat(parentEl.style.top);
  const parentWidth = parentEl.offsetWidth;
  const parentHeight = parentEl.offsetHeight;
  if (nodeModel.parent.isroot) {
    const count = parent.children.reduce((bucket, child) => {
      if (child.direction === Direction.RIGHT) {
        return { ...bucket, right: bucket.right + 1 };
      }
      if (child.direction === Direction.LEFT) {
        return { ...bucket, left: bucket.left + 1 };
      }
      return bucket;
    }, { left: 0, right: 0 });
    if (nodeModel.direction === Direction.RIGHT) {

    } else if (nodeModel.direction === Direction.LEFT) {

    }
    return;
  }

  const childrenLen = parent.children.length;
  if (nodeModel.direction === Direction.RIGHT) {
    nodeEl.style.left = `${parentLeft + parentWidth + MARGIN.HORIZONTAL}px`;
    nodeEl.style.top = `${parentTop + MARGIN.VERTICAL}px`;
  } else if (nodeModel.direction === Direction.LEFT) {

  }
}

function Mindmap() {
  const mindmap = $c('mindmap');
  mindmap.addNode = addNode;
  mindmap.draw = draw;
  return mindmap;
}

export default Mindmap;
