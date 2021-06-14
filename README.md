# auto-VO

Automate VoiceOver for testing web applications.

## Setup

- First, open VoiceOver Utility and check "Allow VoiceOver to be controller with AppleScript".

## Installation

    $ npm install auto-vo

## Usage

### CLI

Running the cli outputs the phrases spoken by the screen reader to stdout.

    $ npx auto-vo --url https://example.com --times 5

`--url URL` - where URL is the url to test

`--limit n` - where n is the maximum number of cursor moves

`--until s` - where s is a search term, after which the script ends. supercedes `--limit`.

### Node Module

    $ npm install --save-dev auto-vo

```typescript
import { run } from 'auto-vo';

(async function() {
    const options = { url: "https://www.example.com", limit: 10, match: 'Example' };

    const announcements = await run(options);

    console.log(announcements);
})();
```


### Example Test Runner

```typescript
import { run } from 'auto-vo';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it('returns announcements', async () => {
    const options = { url: "https://www.example.com", limit: 10, match: 'Example' };

    const announcements = await run(options);

    expect(announcements).to.include.members(["Example Domain web content"]);
  }).timeout(5000);
});
```
