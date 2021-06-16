import { chromium } from 'playwright';
import { sh } from './shell.js'

const COMMANDS = {
  launchVoiceOver: "/System/Library/CoreServices/VoiceOver.app/Contents/MacOS/VoiceOverStarter",
  stopVoiceOver: `./osascripts/stopVoiceover.js`,
  setup: `./osascripts/setup.js`,
  moveRight: './osascripts/moveRight.js',
  getLastPhrase: './osascripts/getLastPhrase.js',
  goToTop: './osascripts/goToTop.js',
}

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
    await sh(COMMANDS.setup);
    await page.goto(url);
    await sh(COMMANDS.goToTop);

    let i = 0;
    let match = false;

    while (i < limit && !match) {
      await sh(COMMANDS.moveRight);
      const { stdout } = await sh(COMMANDS.getLastPhrase);

      if (!quiet) { process.stdout.write(stdout) };
      results.push(stdout);

      if (until && stdout.length > 0 && stdout.match(until)) {
        match = true;
      }
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
