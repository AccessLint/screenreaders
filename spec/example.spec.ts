import { run } from '../index.js';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it('returns announcements', async () => {
    const options = { url: 'https://www.example.com', limit: 10, until: 'Example Domain' };

    const announcements = await run(options);

    expect(announcements).to.include.members(['Example Domain web content\n']);
  }).timeout(10000);
});
