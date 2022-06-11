import { VoiceOver, startInteracting } from '../../voiceover/lib/index';
import { test, expect } from '@playwright/test';

let voiceOver: VoiceOver;
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.beforeAll(async () => {
  voiceOver = new VoiceOver();
});

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  await voiceOver.launch();
  await page.waitForTimeout(1000);
  await voiceOver.rotor({ menu: 'Window Spots', find: 'content' });
  await voiceOver.execute(startInteracting);
});

test.afterEach(async () => {
  await voiceOver.quit();
})

test.describe('New Todo', () => {
  test("should allow me to add todo items", async () => {
    await voiceOver.advance({
      target: { text: "what needs to be done" },
      steps: 5
    });

    await voiceOver.keyStrokes({ text: TODO_ITEMS[0], submit: true });
    await voiceOver.keyStrokes({ text: TODO_ITEMS[1], submit: true });

    const todo = await voiceOver.advance({
      target: { text: TODO_ITEMS[0] },
      steps: 5,
    });

    expect(todo).toMatch(TODO_ITEMS[0]);
  });
});
