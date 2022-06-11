# VoiceOver Browser Tests

A set of fixtures and Playwright tests to evaluate VoiceOver screen reader support across browsers.

run `yarn test` from the package root to execute Playwright tests on Chrome, Firefox, and Webkit/Safari. This will start Playwright in headed mode with a single worker, along with the VoiceOver screen reader driver, making assertions on the VoiceOver output.
