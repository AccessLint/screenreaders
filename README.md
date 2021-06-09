# auto-VO

Automate VoiceOver for iOS application testing with in iOS Simulator.

## Setup

- Install XCode.
- First, open VoiceOver Utility and check "Allow VoiceOver to be controller with AppleScript".

Then on the command line, from the project directory:

    $ bin/setup

## Usage

Start the mobile testing server:

    $ bin/start

Launch automated VoiceOver and assert on output:

    $ bin/test
