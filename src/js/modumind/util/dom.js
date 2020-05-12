const dom = {
  // target,eventType,handler
  addEvent(t, e, h) {
    if (t.addEventListener) {
      t.addEventListener(e, h, false);
    } else {
      t.attachEvent(`on${e}`, h);
    }
  },
};

export default dom;
