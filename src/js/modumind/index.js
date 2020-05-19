import Panzoom from '@panzoom/panzoom';
import MindmapModel from './model/mindmap';
import MindmapView from './view/mindmap';

import {
  file,
  $c,
  logger,
  $d,
  $g,
  $w,
} from './util';
import eventHandler, { EventType } from './event-handler';

const DEFAULT_OPTIONS = {
  viewport: 'viewport',
  editable: true,
  theme: null,
};

function initFileInput() {
  const fileInput = $c('input');
  fileInput.type = 'file';
  fileInput.addEventListener('change', () => {
    const { files } = fileInput;
    if (files.length > 0) {
      const fileData = files[0];
      file.read(fileData, (modumindData) => {
        try {
          this.init(JSON.parse(modumindData));
          eventHandler.invokeEvent(EventType.RELOAD);
        } catch (e) {
          logger.error('can not open this file as mindmap');
        }
      });
    } else {
      logger.error('please choose a file first');
    }
  });
  return fileInput;
}

class ModuMind {
  constructor(options) {
    this.option = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.fileInput = initFileInput.call(this);
    $d.body.appendChild(this.fileInput);
    this.init();
  }

  resize() {
    clearTimeout(this.draw);
    this.draw = setTimeout(() => {
      $d.body.style.height = `${$w.innerHeight}px`;
      this.viewport.style.width = `${$d.body.clientWidth}px`;
      this.viewport.style.height = `${$d.body.clientHeight}px`;
      eventHandler.invokeEvent(EventType.SHOW, this.model.root);
    }, 0);
  }

  init(json) {
    this.model = new MindmapModel(json);
    this.view = new MindmapView();

    this.viewport = $g(this.option.viewport);
    this.container = $c('modumind-container');
    this.container.innerHTML = '';

    this.viewport.appendChild(this.container);
    this.container.appendChild(this.view);
    eventHandler.invokeEvent(EventType.ADD, { root: this.model.root });

    this.selectNode = null;

    $w.addEventListener('resize', this.resize.bind(this));
    $w.addEventListener('click', (e) => {
      const element = e.target;
      this.selectNode = null;
      const tag = element.tagName.toLowerCase();
      if (tag === 'expander') {
        logger.log(element);
        return;
      }
      const nodeEl = element.closest('node');
      if (nodeEl === null) return;
      nodeEl.focus();
      this.selectNode = nodeEl;
    });
    this.resize();
  }

  addNode(parentId, node, index) {
    const parent = this.model.getNode(parentId);
    eventHandler.invokeEvent(EventType.ADD, {
      parent,
      node,
      index,
      root: this.model.root,
    });
    this.resize();
  }

  load() {
    this.fileInput.click();
  }

  save(filename = 'modumind') {
    const mindmap = this.model.getJson();
    file.save(mindmap, 'json', filename);
  }
}

export default ModuMind;
