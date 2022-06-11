import { test, expect } from '@playwright/test';
import { startInteracting, VoiceOver } from "../lib";
import * as path from "path";

let voiceOver: VoiceOver;
const timestamp = new Date().toISOString();
const recordingPath = path.resolve(__dirname, `../../../tmp/test-videos/${timestamp}.mov`);

test.beforeAll(async () => {
  voiceOver = new VoiceOver({ log: true, stepDelayMs: 200 });
});

test.beforeEach(async ({ page }) => {
  voiceOver.record({ file: recordingPath });
  await page.waitForTimeout(3000);
  await voiceOver.launch();
  await page.waitForTimeout(3000);
  await page.goto("https://example.com");

  await voiceOver.rotor({ menu: "Window Spots", find: "content" });
  await voiceOver.execute(startInteracting);
});

test.afterEach(async () => {
  console.log(`Recording saved to ${recordingPath}`);
  await voiceOver.quit();
});

test.describe("example.com", () => {
  test.setTimeout(30000);

  test("link test", async () => {
    const output = await voiceOver.advance({
      target: { text: "More information..." },
      steps: 5,
    });

    expect(output).toEqual("link More information...");
  });
});
