import Panzoom from '@panzoom/panzoom';
import MindmapModel from './model/mindmap';
import MindmapView from './view/mindmap';

import {
  file,
  $c,
  dom,
  logger,
  $d,
  $g,
  $w,
} from './util';

const DEFAULT_OPTIONS = {
  viewport: 'viewport',
  editable: true,
  theme: null,
};

function initFileInput() {
  const fileInput = $c('input');
  fileInput.type = 'file';
  dom.addEvent(fileInput, 'change', () => {
    const { files } = fileInput;
    if (files.length > 0) {
      const fileData = files[0];
      file.read(fileData, (modumindData) => {
        try {
          this.model = new MindmapModel(JSON.parse(modumindData));
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
    this.fileInput = initFileInput.call(this);

    this.option = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.model = new MindmapModel();
    this.view = new MindmapView();

    this.viewport = $g(this.option.viewport);
    this.container = $c('modumind-container');
    this.container.innerHTML = '';

    this.viewport.appendChild(this.container);
    this.container.appendChild(this.view);

    this.init();
  }

  resize() {
    $d.body.style.margin = '0px';
    $d.body.style.overflow = 'hidden';
    $d.body.style.height = `${$w.innerHeight}px`;
    this.viewport.style.width = `${$d.body.clientWidth}px`;
    this.viewport.style.height = `${$d.body.clientHeight}px`;
  }

  init() {
    $w.addEventListener('resize', this.resize.bind(this));
    this.resize();
    this.addNode(this.model.root);
  }

  addNode(node) {
    this.view.addNode(node);
    node.getChildren().forEach((child) => this.view.addNode(child));
    this.view.draw(this.model.root);
  }

  load() {
    this.fileInput.click();
  }

  save(filename = 'modumind') {
    const mindmap = this.model.getJson();
    file.save({ option: this.option, mindmap }, 'json', filename);
  }
}

export default ModuMind;
