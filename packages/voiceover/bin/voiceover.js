#!/usr/bin/env node

const { VoiceOver } = require('../lib/VoiceOver.js');

const voiceOver = new VoiceOver({ log: true });

async function exit(code = 0) {
  await voiceOver.quit();
  process.exit(0);
}

(async () => {
  try {
    await voiceOver.launch();
  } catch (err) {
    console.error(err);
    exit(1);
  }
})();


process.stdin.resume();
process.on('SIGINT', () => {
  exit();
})
