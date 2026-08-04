import { test,expect, Locator } from '@playwright/test';

/* Test Annotations in Playwright:
1. Annotations basically control the execution of the test runs.
2. We can intentionally pass,fail or skip the test using annotations.
   Example: test.only ---> To execute only a specific test
            test.skip --->  To intentionally skip the test | To skip the test based on boolean condition
            test.slow ---> To triple the default timeout (30*3=90sec) [Used inside the test block]
            test.fixme ---> To mark a test that needs to be fixed (Currently it got skip)
            test.fail  ---> To intentionally fail the test
3. We can apply all these annotations to the group also.            
*/

// test.only --> To execute only this test and skip all other tests
test("Verify only Annotation", async ({page}) => {    
await page.goto("https://testautomationpractice.blogspot.com/");
const headers:number = await page.locator("#PageList2 li").count();
expect (headers).toBe(5);
console.log("Only Annotation executed");
});

test("Verify slow Annotation", async ({page}) => {
test.slow(); // triple the default timeout of (30 Sec) -->  90sec
await page.goto("https://automationexercise.com/");
await expect(page).toHaveTitle('Automation Exercise');
console.log("Slow Annotation executed");

});

test.fixme("Verify Fixme Annotation", async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const errorpg = await page.locator("#broken-links a.link").nth(5).click();
const err = await page.locator("body").innerText();
console.log("Fixme Annotation executed", err);

});

test.fail("Verify Fail Annotation", async ({page}) => {
await page.goto("https://automationexercise.com/");
await page.locator("a[href='/login']").click();
await page.locator("input[data-qa='login-email']").fill("rdft123@gmail.com");
await page.locator("input[data-qa='login-password']").fill("Testsde1234");
await page.locator("button[data-qa='login-button']").click();
console.error(await page.locator('[action="/login"] p').innerText());
console.log("Fail Annotation executed");

});

test.describe('Verify Skip Annotation',async () => {

 test("Skip to Subscribe", async ({page}) => {
await page.goto("https://automationexercise.com/");
await page.locator("a[href='/login']").click();
await page.locator('#susbscribe_email').fill("msch123@gmail.com");
console.log("Skip Annotation executed");
 });

test("Login to application", async ({page}) => {
await page.goto("https://automationexercise.com/");
await page.locator("a[href='/login']").click();
await page.locator("input[data-qa='login-email']").fill("msch123@gmail.com");
await page.locator("input[data-qa='login-password']").fill("Test1234");
await page.locator("button[data-qa='login-button']").click();
console.log(await page.locator("div.shop-menu.pull-right a").nth(9).innerText());
});
});

// Skip the test based on specific condition
test('Skip based on Condition',async ({page, browserName}) => {
test.skip(browserName ==='chromium', "Test skip when browsername is chromium") // skip if browser = chromium
await page.goto("https://www.apple.com/")
await expect (page).toHaveTitle('Apple');


});



