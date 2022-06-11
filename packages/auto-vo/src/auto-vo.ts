import { webkit } from 'playwright-webkit';
import { VoiceOver, startInteracting } from '@accesslint/voiceover';

export interface AutoVoOptions {
  url: string;
  until?: string;
  quiet?: boolean;
  limit?: number;
}

export async function run({ url, limit, until, quiet }: AutoVoOptions): Promise<string[]> {
  let results = [];
  const voiceOver = new VoiceOver({ log: !quiet });
  await voiceOver.launch();
  const browser = await webkit.launch({ headless: false });

  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await voiceOver.rotor({ menu: "Window Spots", find: "content" });
    await voiceOver.execute(startInteracting);
    results = await voiceOver.seek({ text: until, tries: limit });
  } catch(error) {
    console.warn(error);
  } finally {
    await voiceOver.quit();
    await browser.close();
    return results;
  }
};
