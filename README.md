# auto-VO

Automate VoiceOver for iOS application testing with in iOS Simulator.

## Setup

- First, open VoiceOver Utility and check "Allow VoiceOver to be controller with AppleScript".

Then, set up environment variables (you can set any `URL` in `.env.sample`)

    $ bin/setup

Log in to save a signed in state

    $ yarn auth

## Usage

Launch automated VoiceOver after you've set up and authed (see above)

    $ yarn start
