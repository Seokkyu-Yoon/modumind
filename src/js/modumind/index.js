import MindMap from './structure/mindmap';
import {
  file, $c, dom, logger,
} from './util';

function initFileInput() {
  const fileInput = $c('input');
  fileInput.type = 'file';
  dom.addEvent(fileInput, 'change', () => {
    const { files } = fileInput;
    if (files.length > 0) {
      const fileData = files[0];
      file.read(fileData, (modumindData) => {
        const modumind = JSON.parse(modumindData);
        if (modumind) {
          this.mindmap.show(modumind, true);
        } else {
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
  constructor() {
    this.mindmap = new MindMap();
    this.fileInput = initFileInput();
  }

  load() {
    this.fileInput.click();
  }

  save(filename = 'modumind') {
    const strJson = this.mindmap.getJson();
    file.save(strJson, 'json', filename);
  }
}

export default ModuMind;
