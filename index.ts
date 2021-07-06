import { chromium } from 'playwright';
import { sh } from './shell.js';
import * as path from 'path';

const COMMANDS = {
  launchVoiceOver: '/System/Library/CoreServices/VoiceOver.app/Contents/MacOS/VoiceOverStarter',
  stopVoiceOver: path.resolve(__dirname, 'osascripts/stopVoiceover.js'),
  moveRight: path.resolve(__dirname, 'osascripts/moveRight.js'),
  getLastPhrase: path.resolve(__dirname, 'osascripts/getLastPhrase.js'),
};

export async function run({ url, limit, until, quiet }: {
  url: string,
  limit?: number,
  until?: string,
  quiet?: boolean,
}): Promise<string[]> {
  let results = [];

  const browser = await chromium.launch({ headless: false });

  try {
    const page = await browser.newPage();

    await sh(COMMANDS.launchVoiceOver);
    await page.waitForTimeout(1000);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    let i = 0;
    let match = false;

    while (i < limit && !match) {
      await sh(COMMANDS.moveRight);
      await page.waitForTimeout(100);
      const { stdout } = await sh(COMMANDS.getLastPhrase);

      if (!quiet) { process.stdout.write(stdout) };
      results.push(stdout);

      if (until && stdout.length > 0 && stdout.match(until)) {
        match = true;
      }
      i++;
    }
  } finally {
    await sh(COMMANDS.stopVoiceOver);
    await browser.close();

    return results;
  }
};
