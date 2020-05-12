import Mindmap from '../src/js/modumind/structure/mindmap';
import Node from '../src/js/modumind/structure/node';
import { Direction } from '../src/js/modumind/util';

const rootTest = new Mindmap();

const rightNodeTest = new Node({
  parent: rootTest,
});

const leftNodeTest = new Node({
  parent: rootTest,
});

const leftNodeTest2 = new Node({
  parent: rootTest,
  direction: Direction.LEFT,
});

const rootAnswer = {
  isroot: true,
  id: rootTest.id,
  parent: null,
  direction: Direction.CENTER,
  expand: { left: true, right: true },
  children: [rightNodeTest, leftNodeTest, leftNodeTest2],
  title: 'Root Node',
  body: 'Root Node',
};

const rightNodeAnswer = {
  isroot: false,
  id: rightNodeTest.id,
  parent: rootTest,
  direction: Direction.RIGHT,
  expand: true,
  children: [],
  title: 'New Node',
  body: 'New Node',
};

const leftNodeAnswer = {
  isroot: false,
  id: leftNodeTest.id,
  parent: rootTest,
  direction: Direction.LEFT,
  expand: true,
  children: [],
  title: 'New Node',
  body: 'New Node',
};

const leftNodeAnswer2 = {
  isroot: false,
  id: leftNodeTest2.id,
  parent: rootTest,
  direction: Direction.LEFT,
  expand: true,
  children: [],
  title: 'New Node',
  body: 'New Node',
};

const mindmapJson = `{
  "isroot": true,
  "id": "${rootTest.id}",
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
      "id": "${rightNodeTest.id}",
      "direction": 1,
      "expand": true,
      "title": "New Node",
      "body": "New Node",
      "children": []
    },
    {
      "isroot": false,
      "id": "${leftNodeTest.id}",
      "direction": -1,
      "expand": true,
      "title": "New Node",
      "body": "New Node",
      "children": []
    },
    {
      "isroot": false,
      "id": "${leftNodeTest2.id}",
      "direction": -1,
      "expand": true,
      "title": "New Node",
      "body": "New Node",
      "children": []
    }
  ]
}`;

/* eslint-disable no-undef */
test('Make Root test', () => {
  expect(rootTest).toEqual(rootAnswer);
});

test('Make Node test', () => {
  expect(rightNodeTest).toEqual(rightNodeAnswer);
  expect(leftNodeTest).toEqual(leftNodeAnswer);
  expect(leftNodeTest2).toEqual(leftNodeAnswer2);
});

test('Node to JSON test', () => {
  expect(rootTest.getMindMap()).toBe(mindmapJson);
});

test('JSON to Node test', () => {
  expect(new Mindmap(JSON.parse(mindmapJson))).toEqual(rootTest);
});
