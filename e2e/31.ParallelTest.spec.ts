import { test, expect, Locator } from "@playwright/test";

/* A: Parallel Execution by different Browsers:
   ===========================================
1. By default Playwright run test in parallel mode due the fullyParallel: true, configuration
2. Workers - 
   2.1 A worker is an independent Node.js process that executes tests.
   2.2 Each worker has its own: Node.js process, Browser instance, Browser context, Test fixtures
   2.3 In parallel mode (fullyParallel: true), Each workers allocated with one single test 
   2.4 In Serial mode (fullyParallel: false) one worker is allocated for all the tests to run serially. 
3. We can customize the no. of workers in parallel testing 
   3.1 [Global configuration]
   export default defineConfig({
   workers: process.env.CI ? 1 : undefined, // comment this line
   workers:3,
   });   
   3.2 [Local Configuration]
   > npx playwright test ParallelTest.spec.ts --worker workerno.
   for ex-  > npx playwright test ParallelTest.spec.ts --worker 5

4. By default, Playwright uses up to one worker per test file. 
   If the number of workers exceeds the number of test files, the extra workers remain idle.
5. Even in parallel mode, setting workers to 1, tests run serially since one worker cannot 
   execute multiple test files
*/

// Approach 1: - [Global Configuration] fullyParallel: true/ false in playwright.config.ts


// Approach 2: - [Local Configuration]

// test.describe.configure({mode: 'serial'})     // mode: serial/parallel
test.describe("Parallel Execution with PW", async () => {
test("1. Verify Testcases", async ({page}) => {
await page.goto("https://automationexercise.com/");
await expect (page.locator("a[href='/test_cases']").first()).toBeVisible(); 
});

test("2. Click Testcases", async ({page}) => {
await page.goto("https://automationexercise.com/");
await page.locator("a[href='/test_cases']").first().click(); 
});

test("3. Verify heading of Testcases List", async ({page}) => {
await page.goto("https://automationexercise.com/");
await page.locator("a[href='/test_cases']").first().click(); 
await page.waitForTimeout(2000);
const heading = await page.locator("h5 span").innerText();
console.log("Get heading:",heading);
expect (heading).toContain("list of test Cases for you to practice the Automation");
});

test("4. Count No. of Testcases", async ({page}) => {
await page.goto("https://automationexercise.com/");
await page.locator("a[href='/test_cases']").first().click(); 
await page.waitForTimeout(2000);
const testlist = page.locator("h4.panel-title u");
console.log("Total Tetscases:",await testlist.allInnerTexts());
await expect(testlist).toHaveCount(26);});
});

/* B. Parallel Execution by same Browsers:
   =======================================
6. To execute parallel execution through same browser makes changes in playwright.config.ts
   5.1 comment this line from top--  fullyParallel: true, and then place under specific browser
    projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] },
         fullyParallel: true,
       },
       {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
       },
       
Note:  This will make parallel runs for chromium and default mode for other browsers    
for ex- npx playwright test ParallelTest.spec.ts --project=chromium
   o/p-        Running 4 tests using 2 workers // parallel mode execution

for ex- npx playwright test ParallelTest.spec.ts --project=firefox
   o/p-        Running 4 tests using 1 workers // serial mode execution

   */