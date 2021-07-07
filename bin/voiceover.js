#!/usr/bin/env node

const { VoiceOver } = require('../VoiceOver.js');

const voiceOver = new VoiceOver();
voiceOver.launch();

function exit() {
  voiceOver.stop();
  process.exit(0);
}

process.stdin.resume();
process.on('SIGINT', () => {
  exit();
})
