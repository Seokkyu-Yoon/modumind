import Mindmap from '../src/js/modumind/structure/mindmap';

import { Direction } from '../src/js/modumind/util';

/* eslint-disable no-undef */
const mindmap = new Mindmap();

// Root Test
const testRootId = mindmap.root.id;
const answerRoot = {
  isroot: true,
  id: testRootId,
  parent: null,
  index: 0,
  direction: Direction.CENTER,
  expand: { left: true, right: true },
  children: mindmap.getNode(testRootId).children,
  title: 'Root Node',
  body: 'Root Node',
};
test('Make Root', () => {
  expect(mindmap.getNode(testRootId)).toEqual(answerRoot);
});

// Add Node Default test
const testNode1Id = mindmap.addNewChild(mindmap.getNode(testRootId)).id;
const answerNode1 = {
  isroot: false,
  id: testNode1Id,
  parent: mindmap.getNode(testRootId),
  index: 0,
  direction: Direction.RIGHT,
  expand: true,
  children: mindmap.getNode(testNode1Id).children,
  title: 'New Node',
  body: 'New Node',
};

test('AddNode default (direction must right: 1)', () => {
  expect(mindmap.getNode(testNode1Id)).toEqual(answerNode1);
});

// Add node test with title and body
const testNode2Id = mindmap.addNewChild(
  mindmap.getNode(testRootId),
  { title: 'Node2', body: 'Node2' },
).id;
const answerNode2 = {
  isroot: false,
  id: testNode2Id,
  parent: mindmap.getNode(testRootId),
  index: 1,
  direction: Direction.LEFT,
  expand: true,
  children: mindmap.getNode(testNode2Id).children,
  title: 'Node2',
  body: 'Node2',
};
test('AddNode default (direction must left: -1)', () => {
  expect(mindmap.getNode(testNode2Id)).toEqual(answerNode2);
});

// Add node test with title, body and direction
const testNode3Id = mindmap.addNewChild(
  mindmap.getNode(testRootId),
  { direction: Direction.LEFT, title: 'Node3', body: 'Node3' },
).id;
const node3 = {
  isroot: false,
  id: testNode3Id,
  parent: mindmap.getNode(testRootId),
  index: 2,
  direction: Direction.LEFT,
  expand: true,
  children: mindmap.getNode(testNode3Id).children,
  title: 'Node3',
  body: 'Node3',
};
test('AddNode to left', () => {
  expect(mindmap.getNode(testNode3Id)).toEqual(node3);
});

// Parsing test
const mindmapJson = `{
  "isroot": true,
  "id": "${testRootId}",
  "index": 0,
  "direction": 0,
  "expand": {
    "left": true,
    "right": true
  },
  "title": "Root Node",
  "body": "Root Node",
  "children": [
    {
      "isroot": false,
      "id": "${testNode1Id}",
      "index": 0,
      "direction": 1,
      "expand": true,
      "title": "New Node",
      "body": "New Node",
      "children": []
    },
    {
      "isroot": false,
      "id": "${testNode2Id}",
      "index": 1,
      "direction": -1,
      "expand": true,
      "title": "Node2",
      "body": "Node2",
      "children": []
    },
    {
      "isroot": false,
      "id": "${testNode3Id}",
      "index": 2,
      "direction": -1,
      "expand": true,
      "title": "Node3",
      "body": "Node3",
      "children": []
    }
  ]
}`;
test('Mindmap to JSON', () => {
  expect(mindmap.getJson()).toBe(mindmapJson);
});
test('JSON to Mindmap', () => {
  expect(new Mindmap(JSON.parse(mindmapJson))).toEqual(mindmap);
});

// move test
const movedRoot1 = {
  isroot: true,
  id: `${testRootId}`,
  index: 0,
  direction: 0,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: [
    {
      isroot: false,
      id: `${testNode2Id}`,
      index: 0,
      direction: -1,
      expand: true,
      title: 'Node2',
      body: 'Node2',
      children: [],
    },
    {
      isroot: false,
      id: `${testNode1Id}`,
      index: 1,
      direction: -1,
      expand: true,
      title: 'New Node',
      body: 'New Node',
      children: [],
    },
    {
      isroot: false,
      id: `${testNode3Id}`,
      index: 2,
      direction: -1,
      expand: true,
      title: 'Node3',
      body: 'Node3',
      children: [],
    },
  ],
};
const movedRoot2 = {
  isroot: true,
  id: `${testRootId}`,
  index: 0,
  direction: 0,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: [
    {
      isroot: false,
      id: `${testNode1Id}`,
      index: 0,
      direction: -1,
      expand: true,
      title: 'New Node',
      body: 'New Node',
      children: [],
    },
    {
      isroot: false,
      id: `${testNode2Id}`,
      index: 1,
      direction: -1,
      expand: true,
      title: 'Node2',
      body: 'Node2',
      children: [],
    },
    {
      isroot: false,
      id: `${testNode3Id}`,
      index: 2,
      direction: -1,
      expand: true,
      title: 'Node3',
      body: 'Node3',
      children: [],
    },
  ],
};
const movedRoot3 = {
  isroot: true,
  id: `${testRootId}`,
  index: 0,
  direction: 0,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: [
    {
      isroot: false,
      id: `${testNode2Id}`,
      index: 0,
      direction: -1,
      expand: true,
      title: 'Node2',
      body: 'Node2',
      children: [],
    },
    {
      isroot: false,
      id: `${testNode3Id}`,
      index: 1,
      direction: -1,
      expand: true,
      title: 'Node3',
      body: 'Node3',
      children: [],
    },
    {
      isroot: false,
      id: `${testNode1Id}`,
      index: 2,
      direction: -1,
      expand: true,
      title: 'New Node',
      body: 'New Node',
      children: [],
    },
  ],
};
const movedRoot4 = {
  isroot: true,
  id: `${testRootId}`,
  index: 0,
  direction: 0,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: [
    {
      isroot: false,
      id: `${testNode2Id}`,
      index: 0,
      direction: -1,
      expand: true,
      title: 'Node2',
      body: 'Node2',
      children: [
        {
          isroot: false,
          id: `${testNode3Id}`,
          index: 0,
          direction: -1,
          expand: true,
          title: 'Node3',
          body: 'Node3',
          children: [],
        },
      ],
    },
    {
      isroot: false,
      id: `${testNode1Id}`,
      index: 1,
      direction: -1,
      expand: true,
      title: 'New Node',
      body: 'New Node',
      children: [],
    },
  ],
};

test('MoveNode node1 between node2 and node3', () => {
  mindmap.moveNode(
    mindmap.getNode(testRootId),
    mindmap.getNode(testNode1Id),
    mindmap.getNode(testNode2Id),
    mindmap.getNode(testNode3Id),
  );
  expect(mindmap).toEqual(new Mindmap(movedRoot1));
});
test('MoveNode node1 before node2', () => {
  mindmap.moveNode(
    mindmap.getNode(testRootId),
    mindmap.getNode(testNode1Id),
    null,
    mindmap.getNode(testNode2Id),
  );
  expect(mindmap).toEqual(new Mindmap(movedRoot2));
});
test('MoveNode node1 after node3', () => {
  mindmap.moveNode(
    mindmap.getNode(testRootId),
    mindmap.getNode(testNode1Id),
    mindmap.getNode(testNode3Id),
    null,
  );
  expect(mindmap).toEqual(new Mindmap(movedRoot3));
});

test('MoveNode node3 to child of node2', () => {
  mindmap.moveNode(
    mindmap.getNode(testNode2Id),
    mindmap.getNode(testNode3Id),
    null,
    null,
  );
  expect(mindmap).toEqual(new Mindmap(movedRoot4));
});

// remove test
const removeNode1 = {
  isroot: true,
  id: `${testRootId}`,
  index: 0,
  direction: 0,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: [
    {
      isroot: false,
      id: `${testNode2Id}`,
      index: 0,
      direction: -1,
      expand: true,
      title: 'Node2',
      body: 'Node2',
      children: [
        {
          isroot: false,
          id: `${testNode3Id}`,
          index: 0,
          direction: -1,
          expand: true,
          title: 'Node3',
          body: 'Node3',
          children: [],
        },
      ],
    },
  ],
};
const removeNode2 = {
  isroot: true,
  id: `${testRootId}`,
  index: 0,
  direction: 0,
  expand: {
    left: true,
    right: true,
  },
  title: 'Root Node',
  body: 'Root Node',
  children: [],
};
test('Remove node1', () => {
  mindmap.removeNode(mindmap.getNode(testNode1Id));
  expect(mindmap).toEqual(new Mindmap(removeNode1));
});
test('Remove node2', () => {
  mindmap.removeNode(mindmap.getNode(testNode2Id));
  expect(mindmap).toEqual(new Mindmap(removeNode2));
});
