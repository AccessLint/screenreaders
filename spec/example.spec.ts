import { run, AutoVoOptions } from '../lib/index.js';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it("returns announcements", async () => {
    const options: AutoVoOptions = {
      url: "https://www.example.com",
      limit: 10,
      until: "link More information",
    };

    const announcements = await run(options);
    const page = announcements.join("");
    expect(page).to.have.string("link More information");
  }).timeout(30000);
});
