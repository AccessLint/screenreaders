#!/usr/bin/env node

const { VoiceOver } = require('../VoiceOver.js');

const voiceOver = new VoiceOver();
await voiceOver.launch();

function exit() {
  await voiceOver.stop();
  process.exit(0);
}

process.stdin.resume();
process.on('SIGINT', () => {
  exit();
})
