# auto-VO

Automated VoiceOver screen reader testing on macOS.

## Usage

First [Disable SIP](https://apple.stackexchange.com/a/208481) on macOS.

1. Reboot your Mac into Recovery Mode by restarting your computer and holding down Command+R until the Apple logo appears on your screen.
1. Click Utilities > Terminal.
1. In the Terminal window, type in `csrutil disable` and press Enter.
1. Restart your Mac.

Then on the command line, from the project directory:

    $ bin/setup 

    $ bin/start "<url>" "<expected text>"

Starts the URL in Safari with VoiceOver and checks for the expected output.
