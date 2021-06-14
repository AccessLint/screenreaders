#!/usr/bin/osascript -l JavaScript

function run() {
  const voiceOver = Application('VoiceOver');

  return voiceOver.lastPhrase.content();
}
