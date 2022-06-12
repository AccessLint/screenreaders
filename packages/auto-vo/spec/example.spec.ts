import { run, AutoVoOptions } from '../src/index';
import { expect } from 'chai';

describe('loading example.com', async () => {
  it("returns announcements", async () => {
    const options: AutoVoOptions = {
      url: "https://www.example.com",
      until: "link More information...",
      limit: 10,
    };

    await run(options);
  }).timeout(30000);
});
