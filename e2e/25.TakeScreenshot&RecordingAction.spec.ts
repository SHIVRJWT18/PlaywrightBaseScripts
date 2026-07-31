import {test,expect,Locator} from '@playwright/test';

//1. Local Screenshot Captures - 
//Screenshots captured using local methods are not automatically attached to the Playwright report.
test('Take Screenshot with PW', async ({ page }) => {
await page.goto("https://the-internet.herokuapp.com/login");
await page.locator("#username").fill("tomsmith");
await page.locator("#password").fill("SuperSecretPassword!");
const timestamp =  Date.now();
await page.locator(".radius").click();
await page.screenshot({path:'screenshots/'+'Homepage'+timestamp+'.png'})

});

test('Take Full Page Screenshot with PW', async ({ page }) => {
await page.goto("https://demowebshop.tricentis.com/");
const timestamp =  Date.now();
await page.screenshot({path:'screenshots/'+'Fullpage'+timestamp+'.png', fullPage:true});
});

test('Specific Locator Screenshot with PW', async ({ page }) => {
await page.goto("https://demowebshop.tricentis.com/");
const elem:Locator = page.locator("div.block.block-poll");
const timestamp =  Date.now();
await elem.screenshot({path:'screenshots/'+'Element1'+timestamp+'.png'});
});

test('Specific PageSection Screenshot with PW', async ({ page }) => {
await page.goto("https://demowebshop.tricentis.com/");
const timestamp =  Date.now();
await page.locator("div.footer-menu-wrapper").screenshot({path:'screenshots/'+'PageSection'+timestamp+'.png'});

});

// 2. Global Screenshot Captures (For all test files)
// Screenshots captured through Global configuration are automatically attached to the Playwright report.

/*2.1 Navigate to the playwright.config.ts file add a parameter for screenshot manually-
Use: {
screenshot: 'off',              // [Default Option]: No screenshots are captured.
            'on',               // Captures a screenshot for every test, whether it passes or fails.
            'on-first-retry',   // Captures a screenshot only on the first retry after a test fails.
            'only-on-failure',  // Captures a screenshot only when a test fails. (Most useful)
}


3. Enable Video-recording of the test runs:
3.1 Navigate to the playwright.config.ts file add a parameter for video-recording-
Use: {
video: 'off',                // [Default Option]: No video is recorded.
       'on',                 // Records a video for every test, whether it passes or fails.
       'on-first-retry',     // Records a video only on the first retry (re-run the test) after a test fails 
       'retain-on-failure',  // Records videos for all tests but retains them only for failed tests and 
                                whenever the test got pass it will remove the failed video (Most useful)
       'retry-with-video',   // Records videos only during retries of failed tests. 
}       

3.2 Video recording can only be enabled through the Playwright configuration file; it cannot be enabled programmatically.
3.3 We can play the video recording inside the reports only.

NOTE:-
The default location of storing of screenshot or video through global configuration is under test results folder.

*/