#!/usr/bin/env node

const { VoiceOver } = require('../VoiceOver.js');

const voiceOver = new VoiceOver();

async function exit() {
  await voiceOver.stop();
  process.exit(0);
}

(async () => {
  await voiceOver.launch();
})();


process.stdin.resume();
process.on('SIGINT', () => {
  exit();
})
