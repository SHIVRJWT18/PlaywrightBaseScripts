import { test,expect,Locator,chromium,Page,Browser } from '@playwright/test';

/* A. Playwright Reporters: 
1. Reporter are used to format and display the test results
2. They help to visualize the output in different styles.
3. By default Playwright support HTML Reports through npx playwright show-reports
4. Supported Built-in Reporters are: - Line Reporter, List Reporter, dot Reporter, Json Reporter,
   Blob Reporter, Html Reporter, Junit Reporter, GitHub Reporter.
5. Customize reporter are: - Allure Reporter, GitHub actions reporter, Mail Reporter, Monocrat, Report Portal   

B. Reports Customization: Navigate to the playwright.config.ts file and apply below changes
Tip --> Delete all old index.html reports from Playwright-report
1. Html: [Global Customization]
1.1. Html reports should open when-
   reporter:   reporter: 'html', --> Comment this line
   reporter: [ ['html', {open: 'always'}] ]
       open: 'on-failure' // (Default Option): Opens the HTML report only if any test fails.
       open: 'always' // Automatically opens the HTML report after every run, whether tests pass or fail.
       open: 'never' //  Never opens the HTML report automatically.
1.2 Html reports should saved in custom folder when-
   reporter: [ ['html', {open: 'always', outputFolder: '<folder name>'}] ] // Create Folder with name
   reporter: [ ['html', {open: 'always', outputFolder: '<folder path>'}] ] // Create sub-Folder with name
   
   @ run command: > npx playwright show-report <folder name>
                  > npx playwright show-report <folder path>
1.3 Locally from the terminal
> npx playwright test <testname>.spec.ts --reporter=html
> npx playwright test <testname>.spec.ts --reporter=[ ['html', {open: 'always', outputFolder: '<folder name>'}] ]
  for ex-  npx playwright test PWreporters.spec.ts --reporter=[ ['html', {open: 'always', outputFolder: 'myownfolder'}] ]

2. List, Line and Dot Reporter works for CMD generally uses for Jenkins 
   reporter: 'list' // Display report in form of list of tests
   reporter: 'line' // Display directly the failure line for failed lines along with other lines
   reporter: 'dot'  // Display characters for pass/ fail the tests  
              Character	   Description
              ·	         Passed
              F	         Failed
              ×	         Failed or timed out - and will be retried
              ±	         Passed on retry (flaky)
              T	         Timed out
              °	         Skipped
3. Json and Junit Reporters - 
3.1 These reporters require you to specify the output file or folder location.
3.2 If no location is specified, the report is generated in the project's root folder.
   reporter: [['junit',{outputFile: 'results.xml'} // Generate the reports in XML format     
   reporter: [['json',{outputFile: 'results.json'} // Generate the reports in JSON format   
3.3 From Terminal:
> npx playwright test PWreporters.spec.ts --reporter=[ ['json', {outputFile: 'myownfolder.json'}]      

4. We can also club all the report format inside playwright global configuration
reporter: [ ['html', {open: 'always'}],
          ['list'],
          ['line'],
          ['dot'],
          ['junit'],
          ['json'],
          ['allure-playwright']  ]

*/
let browser: Browser;
let page: Page;
test.beforeAll('Launch App', async () => {
browser = await chromium.launch();
page = await browser.newPage();   
await page.goto("https://demowebshop.tricentis.com");
});

test.beforeEach('Login App', async () => {  
await page.locator("a[href='/login']").click();
await page.locator("#Email").fill("rkshbhad123@gmail.com");
await page.locator("#Password").fill("RB@1234");
await page.locator("input[type='submit']").last().click();
});

test.afterEach('Logout App', async () => {
await page.locator("a[href='/logout']").click();
});

test.afterAll(async () => {
  await browser.close();
});


test('Verify Search box',async () => {
   const sechbox:Locator = page.locator('#small-searchterms').first();
   await expect(sechbox).toBeVisible();
   console.log("Search box is visible");
});

test('Verify Logo',async () => {
   const logo:Locator = page.locator('img[alt="Tricentis Demo Web Shop"]');
   await expect(logo).toBeVisible();
   console.log("Logo is visible");
});

test('Verify Shopping cart',async () => {
   const cart = await page.locator('a[href="/cart"] span').first().innerText();;
   const cartitem = await page.locator('a[href="/cart"] span').last().innerText();
   console.log(cart+': '+cartitem);
   expect(cartitem).toBe('(0)');
});

 