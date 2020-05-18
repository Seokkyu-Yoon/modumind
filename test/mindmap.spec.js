/* eslint-disable quote-props */
import Mindmap from '../src/js/modumind/model/mindmap';
import Root from '../src/js/modumind/model/root';
import Node from '../src/js/modumind/model/node';

import { Direction } from '../src/js/modumind/util';

/* eslint-disable no-undef */
const mindmap = new Mindmap();

// Root Test
const testRoot = new Root(mindmap.root);
const answerRoot = {
  isroot: true,
  id: testRoot.id,
  parent: null,
  index: 0,
  direction: Direction.CENTER,
  expand: { left: true, right: true },
  children: {
    '-1': [],
    '1': [],
  },
  title: 'Root Node',
  body: 'Root Node',
};
test('Make Root', () => {
  expect(testRoot).toEqual(answerRoot);
});

// Add Node Default test
const testNode1 = new Node(mindmap.addNewChild(mindmap.root));
const answerNode1 = {
  isroot: false,
  id: testNode1.id,
  parent: mindmap.root,
  index: 0,
  direction: Direction.RIGHT,
  expand: true,
  children: [],
  title: 'New Node',
  body: 'New Node',
};

test('AddNode default (direction must right: 1)', () => {
  expect(testNode1).toEqual(answerNode1);
});

// Add node test with title and body
const testNode2 = new Node(mindmap.addNewChild(mindmap.root, { title: 'Node2', body: 'Node2' }));
const answerNode2 = {
  isroot: false,
  id: testNode2.id,
  parent: mindmap.root,
  index: 0,
  direction: Direction.LEFT,
  expand: true,
  children: [],
  title: 'Node2',
  body: 'Node2',
};
test('AddNode default (direction must left: -1)', () => {
  expect(testNode2).toEqual(answerNode2);
});

// Add node test with title, body and direction
const testNode3 = new Node(mindmap.addNewChild(mindmap.root, { direction: Direction.LEFT, title: 'Node3', body: 'Node3' }));
const answerNode3 = {
  isroot: false,
  id: testNode3.id,
  parent: mindmap.root,
  index: 1,
  direction: Direction.LEFT,
  expand: true,
  children: [],
  title: 'Node3',
  body: 'Node3',
};
test('AddNode to left', () => {
  expect(testNode3).toEqual(answerNode3);
});

// Parsing test
const mindmapJson = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [
      {
        isroot: false,
        id: `${testNode2.id}`,
        index: 0,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node2',
        body: 'Node2',
        children: [],
      },
      {
        isroot: false,
        id: `${testNode3.id}`,
        index: 1,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node3',
        body: 'Node3',
        children: [],
      },
    ],
    '1': [
      {
        isroot: false,
        id: `${testNode1.id}`,
        index: 0,
        direction: Direction.RIGHT,
        expand: true,
        title: 'New Node',
        body: 'New Node',
        children: [],
      },
    ],
  },
};
test('Mindmap to JSON', () => {
  expect(mindmap.getJson()).toEqual(mindmapJson);
});
test('JSON to Mindmap', () => {
  expect(new Mindmap(mindmapJson)).toEqual(mindmap);
});

// move test
const answerMove1 = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [
      {
        isroot: false,
        id: testNode2.id,
        index: 0,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node2',
        body: 'Node2',
        children: [],
      },
      {
        isroot: false,
        id: testNode1.id,
        index: 1,
        direction: Direction.LEFT,
        expand: true,
        title: 'New Node',
        body: 'New Node',
        children: [],
      },
      {
        isroot: false,
        id: testNode3.id,
        index: 2,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node3',
        body: 'Node3',
        children: [],
      },
    ],
    '1': [],
  },
};
test('MoveNode node1 between node2 and node3', () => {
  const root = mindmap.getNode(testRoot.id);
  const node1 = mindmap.getNode(testNode1.id);
  const node2 = mindmap.getNode(testNode2.id);
  const node3 = mindmap.getNode(testNode3.id);
  mindmap.moveNode(root, node1, node2, node3);
  expect(mindmap).toEqual(new Mindmap(answerMove1));
});

const answerMove2 = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [
      {
        isroot: false,
        id: testNode1.id,
        index: 0,
        direction: Direction.LEFT,
        expand: true,
        title: 'New Node',
        body: 'New Node',
        children: [],
      },
      {
        isroot: false,
        id: testNode2.id,
        index: 1,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node2',
        body: 'Node2',
        children: [],
      },
      {
        isroot: false,
        id: testNode3.id,
        index: 2,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node3',
        body: 'Node3',
        children: [],
      },
    ],
    '1': [],
  },
};
test('MoveNode node1 before node2', () => {
  const root = mindmap.getNode(testRoot.id);
  const node1 = mindmap.getNode(testNode1.id);
  const node2 = mindmap.getNode(testNode2.id);
  mindmap.moveNode(root, node1, null, node2);
  expect(mindmap).toEqual(new Mindmap(answerMove2));
});

const answerMove3 = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [
      {
        isroot: false,
        id: testNode2.id,
        index: 0,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node2',
        body: 'Node2',
        children: [],
      },
      {
        isroot: false,
        id: testNode3.id,
        index: 1,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node3',
        body: 'Node3',
        children: [],
      },
      {
        isroot: false,
        id: testNode1.id,
        index: 2,
        direction: Direction.LEFT,
        expand: true,
        title: 'New Node',
        body: 'New Node',
        children: [],
      },
    ],
    '1': [],
  },
};
test('MoveNode node1 after node3', () => {
  const root = mindmap.getNode(testRoot.id);
  const node1 = mindmap.getNode(testNode1.id);
  const node3 = mindmap.getNode(testNode3.id);
  mindmap.moveNode(root, node1, node3, null);
  expect(mindmap).toEqual(new Mindmap(answerMove3));
});

const answerMove4 = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [
      {
        isroot: false,
        id: testNode2.id,
        index: 0,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node2',
        body: 'Node2',
        children: [
          {
            isroot: false,
            id: testNode3.id,
            index: 0,
            direction: Direction.LEFT,
            expand: true,
            title: 'Node3',
            body: 'Node3',
            children: [],
          },
        ],
      },
      {
        isroot: false,
        id: testNode1.id,
        index: 1,
        direction: Direction.LEFT,
        expand: true,
        title: 'New Node',
        body: 'New Node',
        children: [],
      },
    ],
    '1': [],
  },
};

test('MoveNode node3 to child of node2', () => {
  const node2 = mindmap.getNode(testNode2.id);
  const node3 = mindmap.getNode(testNode3.id);
  mindmap.moveNode(node2, node3, null, null);
  expect(mindmap).toEqual(new Mindmap(answerMove4));
});

// remove test
const answerRemove1 = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [
      {
        isroot: false,
        id: testNode2.id,
        index: 0,
        direction: Direction.LEFT,
        expand: true,
        title: 'Node2',
        body: 'Node2',
        children: [
          {
            isroot: false,
            id: testNode3.id,
            index: 0,
            direction: Direction.LEFT,
            expand: true,
            title: 'Node3',
            body: 'Node3',
            children: [],
          },
        ],
      },
    ],
    '1': [],
  },
};
test('Remove node1', () => {
  const node1 = mindmap.getNode(testNode1.id);
  mindmap.removeNode(node1);
  expect(mindmap).toEqual(new Mindmap(answerRemove1));
});

const removeNode2 = {
  isroot: true,
  id: testRoot.id,
  index: 0,
  direction: Direction.CENTER,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: {
    '-1': [],
    '1': [],
  },
};
test('Remove node2', () => {
  const node2 = mindmap.getNode(testNode2.id);
  mindmap.removeNode(node2);
  expect(mindmap).toEqual(new Mindmap(removeNode2));
});
