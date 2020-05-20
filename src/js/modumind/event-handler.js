const events = [];

const EventType = {
  SHOW: 1,
  // RESIZE: 2,
  EDIT: 3,
  // SELECT: 4,
  ADD: 5,
  INSERT: 6,
  REMOVE: 7,
  DRAG: 9,
  WHEEL: 10,
  ZOOM: 11,
  VIDEO_LOADED: 12,
  RELOAD: 100, // mindmap is reloaded
};

const Key = {
  META: 8192, // 1 << 13
  CTRL: 4096, // 1 << 12
  ALT: 2048, // 1 << 11
  SHIFT: 1024, // 1 << 10
};

function addEvent(callback) {
  if (typeof callback === 'function') {
    events.push(callback);
  }
}

function invokeEvent(type, data) {
  setTimeout(() => {
    events.forEach((callback) => callback(type, data));
  }, 0);
}

const eventHandler = {
  addEvent,
  invokeEvent,
};

export { EventType, Key };
export default eventHandler;
