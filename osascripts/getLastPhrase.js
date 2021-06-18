#!/usr/bin/osascript -l JavaScript

function run() {
  const voiceOver = Application('VoiceOver');

  if (voiceOver.captionWindow.enabled) {
    return voiceOver.lastPhrase.content();
  }
}
