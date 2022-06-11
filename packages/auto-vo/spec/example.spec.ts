import { run, AutoVoOptions } from '../src/index';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it("returns announcements", async () => {
    const options: AutoVoOptions = {
      url: "https://www.example.com",
      until: "link More information",
    };

    const announcements = await run(options);
    const page = announcements.join("");
    expect(page).to.have.string("link More information");
  }).timeout(30000);
});