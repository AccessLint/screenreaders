import { run } from './index.js';
const minimist = require('minimist');

export async function cli(argv: string[]) {
  const { url, times } = minimist(argv);

  const announcements = await run({ url, times });

  console.log(announcements);
}
