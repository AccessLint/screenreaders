import { run } from './index.js';
const minimist = require('minimist');

export async function cli(argv: string[]) {
  const { url, limit, until } = minimist(argv);

  const announcements = await run({ url, limit, until });

  console.log(announcements);
}
