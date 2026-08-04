import {test,expect} from '@playwright/test';

/*Auto-waiting - whenever we perform some actions Playwright will do some actionability checks 
and if actionability checks are pass then only the action will be performed otherwise throw timeout error. */
test('Auto-Wating Action with PW',async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

// Here Playwright includes auto-retrying assertions that remove flakiness by waiting until the condition is met. 
// Default Time for assertions is 5 sec
await expect(page).toHaveURL('https://demowebshop.tricentis.com/'); 
await expect(page).toHaveTitle('Demo Web Shop');

// Here also Playwright performs a range of actionability checks such as (Visible, Stable, Receives Events, 
// Enabled, Editable on the elements before making actions to ensure these actions behave as expected.
// Default Time for action checks is 30 sec	
await expect(page.locator("input#small-searchterms[name='q']")).toBeVisible();
await page.locator("input#small-searchterms[name='q']").fill('Laptop');

// When we do not want to perform actionability checks then we apply force option
// using force option we can forcefully perform the action without performing the required actionability checks
await page.locator("input#small-searchterms[name='q']").fill('Mobiles', {force:true});   // skips the actionability checks & forcefully fill
await page.locator(".button-1.search-box-button").click({force:true}); // skips the actionability checks & forcefully clicks
});

test('Setting Timeouts for specific test',async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
// 1. Setting timeout for particular action 
test.setTimeout(40000); 
// This timeout is overidden by the global set timeout for this speciifc test
/* For this specific test, Playwright should use the timeout value defined for the test instead 
of the global timeout configured in playwright.config.ts. */

// 2. Setting timeout for particular assertion 
await expect(page).toHaveURL('https://demowebshop.tricentis.com/', {timeout:3000}); 
await expect(page.locator("input#small-searchterms[name='q']")).toBeVisible({timeout:4000});
});   


test('Customizing defaults Timeouts for specific test',async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
// 1. Setting timeout for particular action 
test.slow(); // triple the default time out value[30sec] to 90 sec
});