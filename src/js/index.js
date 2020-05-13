import ModuMind from './modumind';

const moduMind = new ModuMind();
const rootId = moduMind.mindmap.root.id;
const nodeId1 = moduMind.mindmap.addNewChild(moduMind.mindmap.getNode(rootId), { title: 'Node1', body: 'Node1' }).id;
const nodeId2 = moduMind.mindmap.addNewChild(moduMind.mindmap.getNode(rootId), { title: 'Node2', body: 'Node2' }).id;
const nodeId3 = moduMind.mindmap.addNewChild(moduMind.mindmap.getNode(rootId), { title: 'Node3', body: 'Node3', direction: -1 }).id;

console.log(moduMind.mindmap.getJson());
moduMind.mindmap.moveNode(
  moduMind.mindmap.getNode(rootId),
  moduMind.mindmap.getNode(nodeId1),
  moduMind.mindmap.getNode(nodeId2),
  moduMind.mindmap.getNode(nodeId3),
);
console.log(moduMind.mindmap.getJson());
moduMind.mindmap.moveNode(
  moduMind.mindmap.getNode(rootId),
  moduMind.mindmap.getNode(nodeId1),
  null,
  moduMind.mindmap.getNode(nodeId2),
);
console.log(moduMind.mindmap.getJson());
moduMind.mindmap.moveNode(
  moduMind.mindmap.getNode(rootId),
  moduMind.mindmap.getNode(nodeId1),
  moduMind.mindmap.getNode(nodeId3),
  null,
);
console.log(moduMind.mindmap.getJson());
moduMind.mindmap.moveNode(
  moduMind.mindmap.getNode(nodeId2),
  moduMind.mindmap.getNode(nodeId1),
  null,
  null,
);
console.log(moduMind.mindmap.getJson());
console.log(moduMind.mindmap.getNode(nodeId1));
