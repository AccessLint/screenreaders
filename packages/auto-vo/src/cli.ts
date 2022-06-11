import { run } from './index.js';
const minimist = require('minimist');

export async function cli(argv: string[]) {
  const options = minimist(argv);

  await run(options);
}
