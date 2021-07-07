import { webkit } from 'playwright-webkit';
import { sh } from './shell.js';
import * as path from 'path';

const COMMANDS = {
  voiceover: {
    launch: '/System/Library/CoreServices/VoiceOver.app/Contents/MacOS/VoiceOverStarter',
    stop: path.resolve(__dirname, 'osascripts/stopVoiceover.js'),
    cursor: {
      in: path.resolve(__dirname, 'osascripts/moveIn.js'),
      right: path.resolve(__dirname, 'osascripts/moveRight.js'),
    },
    getLastPhrase: path.resolve(__dirname, 'osascripts/getLastPhrase.js'),
  },
};

export async function run({ url, limit, until, quiet }: {
  url: string,
  limit?: number,
  until?: string,
  quiet?: boolean,
}): Promise<string[]> {
  let results = [];

  const browser = await webkit.launch({ headless: false });

  try {
    const page = await browser.newPage();

    await sh(COMMANDS.voiceover.launch);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // traverse browser chrome
    await sh(COMMANDS.voiceover.cursor.right);
    await sh(COMMANDS.voiceover.cursor.right);
    await sh(COMMANDS.voiceover.cursor.right);

    // enter web area
    await sh(COMMANDS.voiceover.cursor.in)
    await page.waitForTimeout(10);

    let i = 0;
    let match = false;

    while (i < limit && !match) {
      await sh(COMMANDS.voiceover.cursor.right);
      await page.waitForTimeout(10);
      const { stdout } = await sh(COMMANDS.voiceover.getLastPhrase);

      if (!quiet) { process.stdout.write(stdout) };
      results.push(stdout);

      if (until && stdout.length > 0 && stdout.match(until)) {
        match = true;
      }
      i++;
    }
  } finally {
    await sh(COMMANDS.voiceover.stop);
    await browser.close();

    return results;
  }
};
