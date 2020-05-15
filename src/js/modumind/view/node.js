import {
  $c,
  $g,
} from '../util';

function Node(nodeModel) {
  const nodeEl = $c('node');
  const parentEl = $g((nodeModel.parent || { id: null }).id);
  nodeEl.setAttribute('id', nodeModel.id);

  const titleEl = $c('div');
  titleEl.setAttribute('id', 'test-title');
  titleEl.innerHTML = `<b>${nodeModel.title}</b>`;
  const bodyEl = $c('div');
  bodyEl.setAttribute('id', 'test-body');
  bodyEl.innerHTML = nodeModel.body;

  nodeEl.appendChild(titleEl);
  nodeEl.appendChild(bodyEl);

  nodeEl.model = nodeModel;
  nodeEl.parentEl = parentEl;
  nodeEl.titleEl = titleEl;
  nodeEl.bodyEl = bodyEl;
  return nodeEl;
}

export default Node;
