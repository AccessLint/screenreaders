import { webkit } from 'playwright-webkit';
import { VoiceOver, moveRight, startInteracting } from 'voiceover';

export interface AutoVoOptions {
  url: string;
  until?: string;
  quiet?: boolean;
  limit?: number;
}

export async function run({ url, limit, until, quiet }: AutoVoOptions): Promise<string[]> {
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

      if (!quiet) { console.log(lastPhrase); };
      results.push(lastPhrase);

      if (until && lastPhrase.length > 0 && lastPhrase.match(until)) {
        match = true;
      }
      i++;
    }
  } catch(error) {
    console.warn(error);
  } finally {
    await voiceOver.quit();
    await browser.close();

    return results;
  }
};
