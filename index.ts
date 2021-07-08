import { webkit } from 'playwright-webkit';
import { VoiceOver } from './VoiceOver.js'
import { moveRight, startInteracting } from './Commands.js'

export async function run({ url, limit, until, quiet }: {
  url: string,
  limit?: number,
  until?: string,
  quiet?: boolean,
}): Promise<string[]> {
  let results = [];
  const voiceOver = new VoiceOver();
  await voiceOver.launch();

  const browser = await webkit.launch({ headless: false });

  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // traverse browser chrome
    await voiceOver.execute(moveRight);
    await voiceOver.execute(moveRight);
    await voiceOver.execute(moveRight);

    // // enter web area
    await voiceOver.execute(startInteracting);
    await page.waitForTimeout(10);

    let i = 0;
    let match = false;

    while (i < limit && !match) {
      await voiceOver.execute(moveRight);
      await page.waitForTimeout(10);
      const lastPhrase: string = await voiceOver.lastPhrase();

      if (!quiet) { process.stdout.write(lastPhrase) };
      results.push(lastPhrase);

      if (until && lastPhrase.length > 0 && lastPhrase.match(until)) {
        match = true;
      }
      i++;
    }
  } finally {
    await voiceOver.stop();
    await browser.close();

    return results;
  }
};
