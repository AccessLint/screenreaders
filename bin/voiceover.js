#!/usr/bin/env node

const { VoiceOver } = require('../VoiceOver.js');

const voiceOver = new VoiceOver();

async function exit() {
  await voiceOver.stop();
  process.exit(0);
}

(async () => {
  try {
    await voiceOver.launch();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  let current, previous = null;

  setInterval(async () => {
    try {
      current = await voiceOver.lastPhrase();
      if (current.trim() === previous) { return };
      console.log(current);
      previous = current.trim();
    } catch (err) {
      console.warn(err);
    }
  }, 100);
})();


process.stdin.resume();
process.on('SIGINT', () => {
  exit();
})
