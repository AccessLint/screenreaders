import { run } from '../index.js';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it('returns announcements', async () => {
    const options = { url: 'https://www.example.com', limit: 10, quiet: true };

    const announcements = await run(options);
    const page = announcements.join('');
    expect(page).to.have.string('link More information')
  }).timeout(30000);
});
