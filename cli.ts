import { run } from './index.js';
const minimist = require('minimist');

export async function cli(argv: string[]) {
  const { url, times, pause } = minimist(argv);

  run({ url, times, pause });
}
