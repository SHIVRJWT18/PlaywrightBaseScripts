import {test, expect, Locator} from '@playwright/test';
/* 1. Tracing:
A. Tracing is the process of capturing everything that happens during test execution.
B. It records both UI actions and internal operations.
C. Tracing helps in debugging test failures.

2. Trace Viewer:
A. Trace Viewer is a GUI tool that displays all traced information in a visual format.
B. It helps analyze, debug, and inspect every recorded action during test execution.

3. trace.zip File:
A. Playwright automatically generates a trace.zip file inside the test-results folder after test execution.
B. This file is attached to the Playwright report and can be opened in Trace Viewer for analysis. 
C. Whenever we open trace.zip we can see the trace viewer window 
D. It has Top bar called time travel feature and two tabs Action and Meta tab where traces are recorded.
E.  We can also traced traced through before/After actions, different locator types, calls, logs, console and networks logs for specific actions

4. Approach 1: Enable tracing through the playwright.config.ts
Use: {
trace: 'off'  //  Disables tracing.
       'on'  //  Captures traces for every test execution.
       'on-first-retry'  //  (Default Option:) Captures traces only during the first retry.
       'on-all-retries'  //  Captures traces for every retry.
       'retain-on-failure'  //  Keeps traces only for failed tests.
       'retain-on-first-failure'  //  Retains traces only for the first failed execution. 
       'retry-with-trace'  //  Captures a trace for every retry attempt of a failed test.
       }   

5. Approach 2: Enable tracing through the terminal 
> npx playwright test <test name>.spec.ts --trace on  // Captures trace for specific test
> npx playwright test --trace on  // Capture trace for all the tests folder 

6. Approach 3: Enable tracing through calling built-in functions:
context.tracing.start(screenshot:true, snapshots:true);  
context.tracing.stop({path:'trace.zip'}); 
*/

test('Tracing through Command', async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("[name='username']").fill("Admin");    
    await page.locator("[name='password']").fill("admin123");  
    await page.locator("button[type='submit']").click();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
});

test('Method Calling Trace Demo', async ({page, context}) => {
    context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("[name='username']").fill("Super");    
    await page.locator("[name='password']").fill("Super1234");  
    await page.locator("button[type='submit']").click();
    await expect(page).not.toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    context.tracing.stop({ path: 'Myfiletrace.zip' });  // Custom file names are not attached to the generated reports.

});

    /* 7. To View Trace File: [3 ways]
    1. To View the Myfiletrace.zip Run the below command
       > npx playwright show-trace Myfiletrace.zip
    2. Upload this file to "https://trace.playwright.dev/" to view the trace in the browser.
    3. Open the trace.zip file generated in the test-results folder after test execution.
    */