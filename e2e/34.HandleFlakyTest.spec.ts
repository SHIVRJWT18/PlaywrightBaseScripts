import { test, expect, Locator } from '@playwright/test';

/*
1. Flaky Test:
A. A flaky test is an unstable test that sometimes passes and sometimes fails without any code changes.
B. It is difficult to determine whether the application or the automation script has an actual issue.
C. These tests require special handling to improve test reliability.

2. Retry: process of automatically re-running a failed test.

3. Common Reasons for Flaky Tests:
A. Slow network or server response.
B. Timing or synchronization issues.
C. Slow loading UI elements or overlapping elements.
D. Animations or dynamic page updates.
E. Intermittent environment-related issues.

4. Approach 1: Enable retry through the playwright.config.ts
   retries: process.env.CI ? 2 : 0,   //  Comment this line used for Continuous integration purpose
   retries: 3, // Hard code the no. of retries 
}

5. Approach 2: Enable retry through the terminal 
> npx playwright test <test name>.spec.ts --retries=3  // Executing retry for specific test
> npx playwright test --retries=3  // Executing retry for all the tests folder 
*/       

test("Flaky Test Action", async ({page}) => {
await page.goto("https://automationexercise.com/");

await page.locator("a[href='/login']").click();
await page.locator("input[data-qa='login-email']").fill("msch123@gmail.com");
await page.locator("input[data-qa='login-password']").fill("Test1234");
await page.locator("button[data-qa='login-button']").click();
await page.waitForTimeout(10000);  // Interrupting to make flaky
console.log(await page.locator("div.shop-menu.pull-right a").nth(9).innerText());
});