import { Writable } from 'stream';

/**
 * We actually export the silentStream to avoid Pino leaving open handles during test, causing warnings
 */
export const silentStream = new Writable({
  write(_chunk, _encoding, callback) {
    callback();
  },
});
