import { chromium } from 'playwright';
import { sh } from './shell.js'

const launchVoiceOver = "/System/Library/CoreServices/VoiceOver.app/Contents/MacOS/VoiceOverStarter";
const stopVoiceOver = "osascript -e 'tell application \"System Events\" to key code 96 using {command down}'";
const moveToTop = "osascript -e 'tell application \"System Events\" to key code 115 using {control down, option down}'";
const moveRight = "osascript -e 'tell application \"System Events\" to key code 124 using {control down, option down}'";
const copyLastPhrase = "osascript -e 'tell application \"VoiceOver\" to copy to pasteboard last phrase'";
const pasteLast = "pbpaste";

const userDataDir = '/tmp';

export async function run({ url, times, pause }: {
  url: string,
  times?: number,
  pause?: boolean
}): Promise<void> {
  let results = [];

  const context = await chromium.launchPersistentContext(userDataDir, { headless: false });

  try {
    const page = await context.newPage();

    await sh(launchVoiceOver);

    await page.goto(url);

    if (pause) {
      await page.pause();
    }

    await sh(moveToTop);

    let i = 0;
    while (i < times) {
      await sh(moveRight);
      await sh(copyLastPhrase);
      const { stdout } = await sh(pasteLast);
      results.push(stdout);
      i++;
    }

    console.log(results);
  } catch(err) {

  } finally {
    await sh(stopVoiceOver);
    await context.close();
  }
};
