# VoiceOver.js

A CLI and TypeScript interface for VoiceOver screen reader  on macOS. 

Use it to launch VoiceOver and log output to the command line, or write your own scripts to drive the screen reader.

## Setup

1. Open VoiceOver Utility and check "Allow VoiceOver to be controller with AppleScript".
1. Enable Terminal app in System Preferences > Security & Privacy > Privacy > Accessibility.
1. Accept Terminal VoiceOver automation permissions when prompted. (You can manage these later in System Preferences > Security & Privacy > Privacy > Automation).

## Usage

### CLI

    $ npx @accesslint/voiceover

- Press Control-C to stop.
- If the program exits without quitting VoiceOver, press Command-F5 or close the VoiceOver caption panel using the X button.
- You can also use Siri "hey Siri, turn off VoiceOver".

### NodeJS

`yarn add @accesslint/voiceover` or `npm i @accesslint/voiceover`.

```javascript
import { VoiceOver } from '@accesslint/voiceover';

const voiceOver = new VoiceOver();
await voiceOver.launch(); // start VoiceOver screen reader
voiceOver.tail(); // print last phrase on navigation
// perform actions using seek, rotor, and execute
await voiceOver.quit(); // stop VoiceOver
```

#### Examples

##### Advance cursor to text

You can navigate to a specific phrase:

```javascript
import { VoiceOver } from "@accesslint/voiceover";

const voiceOver = new VoiceOver({ log: true });

// open target application, e.g. with PlayWright

await voiceOver.launch();

await voiceOver.advance({
  target: {
    text: 'Example',
    role: 'heading'
  },
  steps: 10
});
```

##### Screen recording

Save recordings of VoiceOver interactive sessions:

```javascript
import { VoiceOver } from "@accesslint/voiceover";
import * as path from "path";

const voiceOver = new VoiceOver({ log: true });
voiceOver.record({ file: path.resolve(__dirname, 'recording.mov') });

// open target application, e.g. with PlayWright

await voiceOver.launch();
// peform interactions
```

##### Rotor Navigation

In a realistic user scenario, someone could navigate the page by headings:

```javascript
await voiceOver.rotor({ menu: 'Headings', find: 'my heading' }); // navigate directly to a heading using the web rotor
```

or by landmark:

```javascript
await voiceOver.rotor({ menu: 'Landmarks', find: 'search' }); // navigate directly to a heading using the web rotor
```

##### CLI

###### Launching a URL with VoiceOver running

    $ open https://www.example.com -a Safari && npx @accesslint/voiceover
    #=> Welcome to macOS. VoiceOver is on.
    #=> Example Domain - Google Chrome Page has 1 link 1 heading 8 articles

###### Saving VoiceOver output to a text file

    $ open https://www.twitter.com -a Safari && npx @accesslint/voiceover | grep heading > headings.txt
