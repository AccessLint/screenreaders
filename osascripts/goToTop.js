#!/usr/bin/osascript -l JavaScript

function run() {
  const systemEvents = Application('System Events');
  const home = 115;

  systemEvents.keyCode(home, { using: ['control down', 'option down'] });
  return true;
}