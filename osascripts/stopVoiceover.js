#!/usr/bin/osascript -l JavaScript

function run() {
  const systemEvents = Application('System Events');
  const f5 = 96;

  systemEvents.keyCode(f5, { using: 'command down' });
}
