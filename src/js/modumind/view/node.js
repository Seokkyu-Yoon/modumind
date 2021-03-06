import {
  $c,
  Direction,
} from '../util';

function Expander(nodeModel) {
  const EXPANDER_SIZE = 14;
  const leftExpanderEl = $c('expander');
  leftExpanderEl.setAttribute('id', nodeModel.id);
  leftExpanderEl.setAttribute('direction', Direction.LEFT);
  leftExpanderEl.innerHTML = '+';
  leftExpanderEl.style.left = `${-EXPANDER_SIZE}px`;

  const rightExpanderEl = $c('expander');
  rightExpanderEl.setAttribute('id', nodeModel.id);
  rightExpanderEl.setAttribute('direction', Direction.RIGHT);
  rightExpanderEl.innerHTML = '+';
  rightExpanderEl.style.right = `${-EXPANDER_SIZE}px`;

  const expander = {};
  expander[Direction.LEFT] = leftExpanderEl;
  expander[Direction.RIGHT] = rightExpanderEl;
  return expander;
}

function Node(nodeModel) {
  const nodeEl = $c('node');
  nodeEl.setAttribute('id', nodeModel.id);

  const titleEl = $c('div');
  titleEl.innerHTML = `<b>${nodeModel.title}</b>`;
  nodeEl.appendChild(titleEl);

  const bodyEl = $c('div');
  bodyEl.innerHTML = nodeModel.body;
  nodeEl.appendChild(bodyEl);

  const expander = new Expander(nodeModel);
  if (nodeModel.direction !== Direction.RIGHT) {
    nodeEl.appendChild(expander[Direction.LEFT]);
  }
  if (nodeModel.direction !== Direction.LEFT) {
    nodeEl.appendChild(expander[Direction.RIGHT]);
  }
  Object.assign(nodeModel);
  return nodeEl;
}

export default Node;
