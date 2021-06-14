#!/usr/bin/osascript -l JavaScript

function run() {
  const rightArrow = 124;
  const voModifier = ['control down', 'option down'];

  const systemEvents = Application('System Events');

  systemEvents.keyCode(rightArrow, { using: voModifier });
  return true;
}
