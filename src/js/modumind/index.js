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
  fileInput.addEventListener('change', () => {
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

    this.edit = false;
    this.selectNode = null;
    this.init();
  }

  resize() {
    clearTimeout(this.draw);
    this.draw = setTimeout(() => {
      $d.body.style.height = `${$w.innerHeight}px`;
      this.viewport.style.width = `${$d.body.clientWidth}px`;
      this.viewport.style.height = `${$d.body.clientHeight}px`;
      this.view.draw(this.model);
    }, 0);
  }

  init() {
    $w.addEventListener('resize', this.resize.bind(this));
    $w.addEventListener('click', (e) => {
      const element = e.target;
      const tag = element.tagName.toLowerCase();
      if (tag === 'expander') {
        console.log(element);
        return;
      }
      const nodeEl = element.closest('node');
      if (nodeEl === null) return;
      nodeEl.focus();
      console.log(nodeEl);
    });
    Object.values(this.model.nodes).forEach((node) => {
      this.view.addNode(node);
    });
    this.resize();
  }

  addNode(parentId, node) {
    const parent = this.model.getNode(parentId);
    const nodeModel = this.model.addNewChild(parent, node);
    this.view.addNode(nodeModel);
    this.resize();
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
