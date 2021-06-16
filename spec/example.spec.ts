import { run } from '../index.js';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it('returns announcements', async () => {
    const options = { url: 'https://www.smashingmagazine.com', limit: 500, until: 'Founded by Vitaly Friedman and Sven Lennartz.' };

    const announcements = await run(options);
    const page = announcements.join();
    expect(page).to.have.string("heading level 1")
  }).timeout(180000);
});
