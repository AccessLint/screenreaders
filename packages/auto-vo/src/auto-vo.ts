import { webkit } from 'playwright-webkit';
import { VoiceOver, startInteracting } from '@accesslint/voiceover';

export interface Options {
  url: string;
  until?: string;
  quiet?: boolean;
  limit?: number;
  target?: string;
}

export async function run({
  url,
  quiet,
  limit = 10,
  until,
}: Options): Promise<void> {
  const voiceOver = new VoiceOver({ log: !quiet, stepDelayMs: 1000 });
  await voiceOver.launch();
  const browser = await webkit.launch({ headless: false });

  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await voiceOver.rotor({ menu: "Window Spots", find: "content" });
    await voiceOver.execute(startInteracting);
    await voiceOver.advance({
      target: { text: until },
      steps: limit,
    });
  } catch (error) {
    console.warn(error);
  } finally {
    await voiceOver.quit();
    await browser.close();
  }
};
