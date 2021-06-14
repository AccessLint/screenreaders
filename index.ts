import { chromium } from 'playwright';
import { sh } from './shell.js'

const COMMANDS = {
  launchVoiceOver: "/System/Library/CoreServices/VoiceOver.app/Contents/MacOS/VoiceOverStarter",
  stopVoiceOver: `./osascripts/stopVoiceover.js`,
  moveRight: './osascripts/moveRight.js',
  getLastPhrase: './osascripts/getLastPhrase.js',
}

export async function run({ url, limit, until }: {
  url: string,
  limit?: number,
  until?: string,
}): Promise<string[]> {
  let results = [];

  const browser = await chromium.launch({ headless: false });

  try {
    const page = await browser.newPage();
    await sh(COMMANDS.launchVoiceOver);
    await page.goto(url);

    let i = 0;
    while (i < limit) {
      await sh(COMMANDS.moveRight);
      const { stdout } = await sh(COMMANDS.getLastPhrase);
      results.push(stdout);
      if (stdout.match(until)) { return results; }
      i++;
    }
  } catch(err) {
    console.error(err);
  } finally {
    await sh(COMMANDS.stopVoiceOver);
    await browser.close();

    return results;
  }
};
