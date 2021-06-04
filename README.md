# auto-VO

Automated VoiceOver screen reader testing on macOS.

## Usage

First [Disable SIP](https://apple.stackexchange.com/a/208481) on macOS.

Then:

    bin/setup 

    bin/start "<url>" "<expected text>"

Starts the URL in Safari with VoiceOver and checks for the expected output.
