import { Given, When, Then, World, setWorldConstructor, IWorldOptions, BeforeAll, Before, After, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { BrowserContext, expect, Page, PlaywrightTestOptions, webkit, WebKitBrowser } from '@playwright/test';
import { startInteracting, VoiceOver } from "@accesslint/voiceover";

interface ICustomWorld extends World {
  page?: Page;
  context?: BrowserContext;
  playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60000);

let browser: WebKitBrowser;
let voiceOver: VoiceOver;

BeforeAll(async () => {
  browser = await webkit.launch({ headless: false });
  voiceOver = new VoiceOver({ log: true });
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  await voiceOver.launch();
  await this.page.waitForTimeout(1000);
  await voiceOver.rotor({ menu: 'Window Spots', find: 'content' });
  await voiceOver.execute(startInteracting);
})

After(async function (this: ICustomWorld) {
  await this.page?.close()
  await this.context?.close()
  await voiceOver.quit();
})

AfterAll(async function (this: ICustomWorld) {
  await browser.close(); 
})

Given('I visit TodoMVC examples', async function (this: ICustomWorld) {
  await this.page!.goto("https://demo.playwright.dev/todomvc");
});

When('I fill in {string} with {string}', async (field: string, text: string) => {
  await voiceOver.advance({ target: { text: field }, steps: 10 });
  await voiceOver.keyStrokes({ text, submit: true });
});

When("I submit a todo item {string}", async (text: string) => {
});

Then("I see the todo item {string}", async (text: string) => {
  const todo = await voiceOver.advance({ target: { text }, steps: 10 });
  expect(todo).toMatch(text);
});
