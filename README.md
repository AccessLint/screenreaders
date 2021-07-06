# auto-VO

Automate VoiceOver for testing web applications.

## Setup

## Installation

    `$ npm install -g auto-vo`

## Setup

1. Open VoiceOver Utility and check "Allow VoiceOver to be controller with AppleScript".
1. Enable Terminal app in System Preferences > Security & Privacy > Privacy > Accessibility.
1. Accept Terminal VoiceOver automation permissions when prompted. (You can manage these later in System Preferences > Security & Privacy > Privacy > Automation).
1. Optional: disable Dication shortcut under System Preferences > Keyboard > Dictation.

<img width="675" alt="Screen Shot of automation preferences" src="https://user-images.githubusercontent.com/108163/124667291-32d48980-de7d-11eb-9b72-ce2c3fa83352.png">

<img width="827" alt="Screen Shot of VoiceOver Utility general pane" src="https://user-images.githubusercontent.com/108163/124667336-44b62c80-de7d-11eb-913d-435f9ea50001.png">

## Usage

### CLI

Running the cli outputs the phrases spoken by the screen reader to stdout.

    $ npx auto-vo --url https://example.com --limit 5 --until 'Example'

`--url URL` - where URL is the url to test

`--limit n` - where n is the maximum number of cursor moves

`--until s` - where s is a search term, after which the script ends. supercedes `--limit`.

`--quiet` - do not print to stdout

### Node Module

    $ npm install --save-dev auto-vo

```typescript
import { run } from 'auto-vo';

(async function() {
    const options = { url: "https://www.example.com", limit: 10, until: 'Example' };

    const announcements = await run(options);

    console.log(announcements);
})();
```


### Example Test Runner

Using mocha/chai:

```typescript
import { run } from 'auto-vo';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it('returns announcements', async () => {
    const options = { url: "https://www.example.com", limit: 10, until: 'Example', quiet: true };

    const announcements = await run(options);

    expect(announcements).to.include.members(["Example Domain web content"]);
  }).timeout(5000);
});
```
