#!/usr/bin/osascript -l JavaScript

function run() {
  const voiceOver = Application("VoiceOver");

  const i = 0;
	while (!voiceOver.captionWindow.enabled() && i < 10) {
    delay(1);
    i++;
  }

  return true;
}