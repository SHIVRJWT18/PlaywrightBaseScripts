import { test, expect, Locator } from '@playwright/test';

/* My Own Custom Reporter:
1. We can built our own custom reporter by implementing the Playwright Reporter 
   interface.
2. Configuration: (Two ways)
2.1 [Global Configuration]: Update your Playwright config.ts file 
    export default defineConfig({
        reporter: [['e2e\34.1. MyCustomReport.ts', {customOptions: 'some value'}] ],
    });  
2.2  [Terminal Configuration]     
> npx playwright test --reporter="e2e\34.1. MyCustomReport.ts"

3. We can also club all the report format inside playwright global configuration
reporter: [ ['html', {open: 'always'}],
            ['list'],
            ['line'],
            ['dot'],
            ['junit'],
            ['json'],
            ['allure-playwright'],
            ['e2e\34.1. MyCustomReport.ts']  
           ]

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

