import { defineConfig } from '@playwright/test';
import process from 'process';
import { Mode } from './src/enums/browser-mode';
import path from 'path';

const args = process.argv.slice(2);
const projectIndex = args.findIndex((arg) => arg.startsWith('--project='));
if (projectIndex !== -1) process.env.PROJECT = args[projectIndex].split('=')[1];
export let mode: Mode;
process.env.PROJECT === 'Mobile' ? (mode = Mode.MOBILE) : (mode = Mode.DESKTOP);

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: !!process.env.CI,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['blob'], ['list']] : [['html', { open: 'never' }], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: !!process.env.CI,
    screenshot: 'on',
    viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://shopdemo-alex-hot.koyeb.app',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop-Chrome',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized', '--force-color-profile=srgb', '--hide-scrollbars'],
          downloadsPath: path.join(__dirname, '/downloads'),
        },
      },
    },
    {
      name: 'Mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        launchOptions: {
          args: ['--force-color-profile=srgb', '--hide-scrollbars'],
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
