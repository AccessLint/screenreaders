import { run } from '../index.js';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it('returns announcements', async () => {
    const options = { url: "https://www.example.com", times: 10 };

    const announcements = await run(options);

    expect(announcements).to.include.members(["Example Domain web content"]);
  }).timeout(10000);
});
