function noop() { }
const logger = (typeof console === 'undefined') ? {
  log: noop, debug: noop, error: noop, warn: noop, info: noop,
} : console;

export default logger;
