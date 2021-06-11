import { run } from './index.js';
const minimist = require('minimist');

export async function cli(argv: string[]) {
  const { url, times } = minimist(argv);

  run({ url, times });
}
