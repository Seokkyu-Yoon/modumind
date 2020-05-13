import Root from './root';
import Node from './node';
import { logger } from '../util';

/**
 * This function need to remove circular
 * @param {Node} node
 */
function removeParent(node) {
  return {
    isroot: node.isroot,
    id: node.id,
    index: node.index,
    direction: node.direction,
    expand: node.expand,
    title: node.title,
    body: node.body,
    children: node.children.map(removeParent),
  };
}

class Mindmap {
  constructor(json) {
    this.root = new Root(json);
    this.nodes = {};

    if (!this.initNodes(this.root)) {
      logger.warn('Fail to init nodes');
      return null;
    }
  }

  initNodes(node) {
    if (node.id in this.nodes) {
      logger.warn(`nodeId[${node.id}] is already exists`);
      return false;
    }
    this.nodes[node.id] = node;
    return !node.children.some((child) => !this.initNodes(child));
  }

  getNode(node) {
    if (Node.isNode(node)) {
      return this.getNode(node.id);
    }
    if (node in this.nodes) {
      return this.nodes[node];
    }
    return null;
  }

  addNewChild(parent, node = {}, index = -1) {
    const newNode = new Node({ ...node, parent, index });
    if (this.getNode(newNode) !== null) {
      return this.addNewChild(parent, node, index);
    }
    this.nodes[newNode.id] = newNode;
    return newNode;
  }

  moveNode(parent, srcNode, beforeNode = null, afterNode = null, direction) {
    if (srcNode.isroot) {
      logger.warn("Can't move root node");
      return null;
    }
    srcNode.remove();
    let index;
    if (beforeNode === null) {
      index = 0;
    } else if (afterNode === null) {
      index = -1;
    } else {
      index = Math.ceil((beforeNode.index + afterNode.index) / 2);
    }

    const nodeDirection = {
      direction,
      ...afterNode,
      ...beforeNode,
    }.direction;

    const movedNode = new Node({
      ...srcNode,
      parent,
      index,
      direction: nodeDirection,
    });
    this.nodes[movedNode.id] = movedNode;

    return movedNode;
  }

  removeNode(srcNode) {
    if (srcNode.isroot) {
      logger.warn("Can't remove root node");
      return;
    }
    srcNode.remove();
    const removeNodes = [srcNode, ...srcNode.getChildren()];
    this.nodes = Object.keys(this.nodes).reduce((bucket, nodeId) => {
      if (removeNodes.includes(this.nodes[nodeId])) return bucket;
      const temp = {};
      temp[nodeId] = this.nodes[nodeId];
      return {
        ...bucket,
        ...temp,
      };
    }, {});
  }

  getJson() {
    return JSON.stringify(removeParent(this.root), null, 2);
  }
}

export default Mindmap;
