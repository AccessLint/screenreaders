#!/usr/bin/env node

const { VoiceOver, rotor, moveRight, startInteracting } = require('../VoiceOver.js'); 

const Commands = new Map([
  ["rotor", rotor],
  ["move right", moveRight],
  ["move in", startInteracting],
]);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "command > ",
})

const voiceOver = new VoiceOver();
voiceOver.launch();

function exit () {
  readline.close();
  voiceOver.stop();
  process.exit(0);
}

readline.prompt();

readline.on('line', async (line) => {
  const input = line.trim();
  if (!Commands.has(input)) { return false }
  const command = Commands.get(input);
  await voiceOver.execute(command);
  readline.prompt();
}).on('close', () => {
  exit();
});

readline.on('SIGINT', () => {
  exit();
})
