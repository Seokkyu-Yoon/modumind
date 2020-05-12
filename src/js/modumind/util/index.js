import logger from './logger';
import Direction from './direction';
import uuid from './uuid';
import file from './file';
import dom from './dom';

const $w = window;
const $d = document;
const $g = (id) => $d.getElementById(id);
const $c = (tag) => $d.createElement(tag);
const $t = (n, t) => {
  if (n.hasChildNodes()) {
    Object.assign(n.firstChild, { nodeValue: t });
  } else {
    n.appendChild($d.createTextNode(t));
  }
};
const $h = (n, t) => {
  if (t instanceof HTMLElement) {
    Object.assign(n, { innerHTML: '' });
    n.appendChild(t);
  } else {
    Object.assign(n, { innerHTML: t });
  }
};
const $i = (el) => (
  !!el
  && (typeof el === 'object')
  && (el.nodeType === 1)
  && (typeof el.style === 'object')
  && (typeof el.ownerDocument === 'object')
);

export {
  $w,
  $d,
  $g,
  $c,
  $t,
  $h,
  $i,
  logger,
  Direction,
  uuid,
  file,
  dom,
};
