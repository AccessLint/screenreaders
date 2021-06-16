import { run } from './index.js';
const minimist = require('minimist');

export async function cli(argv: string[]) {
  const { url, limit, until, quiet } = minimist(argv);
  
  await run({ url, limit, until, quiet });
}
