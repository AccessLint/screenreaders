#!/usr/bin/osascript -l JavaScript

function run() {
  const downArrow = 125;
  const voModifier = ['control down', 'option down', 'shift down'];

  const systemEvents = Application('System Events');

  systemEvents.keyCode(downArrow, { using: voModifier });
  return true;
}
