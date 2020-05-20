import Panzoom from '@panzoom/panzoom';
import eventHandler, { EventType } from '../event-handler';
import { $d } from '../util';

const LEVEL = [
  0.36788,
  0.40657,
  0.44933,
  0.496586,
  0.548812,
  0.606531,
  0.670321,
  0.740819,
  0.818732,
  0.904839,
  1,
  1.10517,
  1.2214,
  1.34986,
  1.49182,
  1.64872,
  1.82212,
  2.01375,
  2.22554,
  2.4596,
  2.71828,
  3.00417,
];

class PanzoomPlugin {
  constructor(target, handler) {
    this.target = target;
    this.handler = handler;
    this.init();
  }

  init() {
    this.panzoom = new Panzoom(this.target, {
      maxScale: 3,
      minScale: 0.1,
      origin: `${$d.offsetWidth / 2} ${$d.offsetHeight / 2}`,
    });
  }

  attach() {
    eventHandler.addEvent((type, data) => {
      if (type === EventType.WHEEL) {
        this.panzoom.zoomWithWheel(data);
      }
      if (type === EventType.ZOOM) {
        this.panzoom.zoom(LEVEL[this.getLevel()]);
      }
    });
  }

  getLevel() {
    return LEVEL.indexOf(this.panzoom.getScale()) + 1;
  }
}

export default PanzoomPlugin;
