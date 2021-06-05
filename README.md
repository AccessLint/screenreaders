# auto-VO

Automate VoiceOver to test macOS apps in the Cloud.

This script can run on any macOS installation with SIP disabled without _any_ custom configuration of VoiceOver or AppleScript.

This is useful for cloud installations and CI runs where you're not able to manually set user preferences for Accessibility.

## Example Usage

First [Disable SIP](https://apple.stackexchange.com/a/208481) on macOS.

Then on the command line, from the project directory:

    $ bin/setup

    $ bin/start "<url>" "<expected text>"

Starts the URL in Safari with VoiceOver and checks for the expected output.
