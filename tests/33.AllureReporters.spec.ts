import { test, expect, Locator } from '@playwright/test';
/* A. Allure Reporters: 
1. Allure Report provide beautiful and detailed test execution reports for the playwright tests.

2. Installation:
2.1 This command add allure playwright as a development dependency to the project
   > npm install -D allure-playwright  

3. Configuration: (Two ways)
3.1 [Global Configuration]: Update your Playwright config.ts file 
    export default defineConfig({
        reporter: 'allure-playwright'
    });  
3.2  [Terminal Configuration]     
> npx playwright test --reporter=line,allure-playwright
> npx playwright test tests/32.PWReporters.spec.ts --reporter=line,allure-playwright

4. Install Allure CLI 
4.1 To view the test report We need Allure CLI to be installed
> npm install -g allure-commandline --save-dev
4.2 To verify allure CLI
> allure --version   // 2.43.0

5. Post installation, Once the playwright test are executed, Navigate to the ./allure-results directory 

6. To Generate the report:
> allure generate ./allure-results -o ./allure-report  // allure-report is a folder where allure-results are generated 
6.1 To clean the previous report & generate the new one.
> allure generate ./allure-results -o ./allure-report --clean

7. To Open the report in your browser
> allure open ./allure-report 

8. We can enable the screen shot and video by configuring Playwright.config.ts - 
Use: {
screenshot: 'only-on-failure',      
video: 'retain-on-failure',        
},

Reference: https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright
*/

test.beforeEach('Login App', async ({page}) => {  
await page.goto("https://demowebshop.tricentis.com");
await page.locator("a[href='/login']").click();
await page.locator("#Email").fill("rkshbhad123@gmail.com");
await page.locator("#Password").fill("RB@1234");
await page.locator("input[type='submit']").last().click();
});

test.afterEach('Logout App', async ({page}) => {
await page.locator("a[href='/logout']").click();
});


test('Verify Search box',async ({page}) => {
   const sechbox:Locator = page.locator('#small-searchterms').first();
   await expect(sechbox).toBeVisible();
   console.log("Search box is visible");
});

test('Verify Logo',async ({page}) => {
   const logo:Locator = page.locator('img[alt="Tricentis Demo Web Shop"]');
   await expect(logo).toBeVisible();
   console.log("Logo is visible");
});

test('Verify Shopping cart',async ({page}) => {
   const cart = await page.locator('a[href="/cart"] span').first().innerText();;
   const cartitem = await page.locator('a[href="/cart"] span').last().innerText();
   console.log(cart+': '+cartitem);
   expect(cartitem).toBe('(40)');
   });

