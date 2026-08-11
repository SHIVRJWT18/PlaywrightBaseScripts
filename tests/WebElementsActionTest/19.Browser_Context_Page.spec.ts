import {test,expect,Locator,Page, firefox} from '@playwright/test';

/* 1. Browser - Playwright needs specific versions of browser binaries to operate. 
Playwright can run tests on Chromium, WebKit and Firefox browsers as well as branded browsers 
such as Google Chrome and Microsoft Edge. It can also run on emulated tablet and mobile devices.

2. Context - Every browser maintain a user context i.e store some information about the user. We 
can create N no. of context for the single browser. similar to creating user profile on the same
browser. It provide a way to operate multiple independent browsers sessions. 

for e.g - Extensions and plug-in added in the browsers which can only accessed by that user only. 

3. pages - Each BrowserContext can have multiple pages. A Page refers to a single tab or a popup window 
within a browser context. It should be used to navigate to URLs and interact with the page content.

Browser  -----------------> context   ----------------> pages
(chromium,firefox,webkit)   (Multiple Users/apps)       (New Tab, Window,Pop-up)
*/

test("Browser Page Demo", async ({page}) => { // page represent a page fixture
 await page.goto("https://testautomationpractice.blogspot.com/");
}); /* Here page is related to all the 3 default configured browser in PW config.ts  i.e chromium,firefox,webkit
and its create a default context for the browsers and uses same context */ 

test("Browser Context Demo", async ({context})=>{
 const page = await context.newPage();
 await page.goto("https://testautomationpractice.blogspot.com/");
});

test("Browser Demo", async ({browser})=>{ // It will take browser value from the PW config.ts
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");
});

test("Custom Browser Demo", async ()=>{ // Inside async fun No need to pass browser variable 
  const browser = await firefox.launch(); //   since it has been added here (Add from import stmt)
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");
});

/* NOTE:-
test("Custom Browser Demo", async ({XXX})=>{ 
  const browser = await firefox.launch();   // if XXX=browser then 45 line is not required
  const context = await browser.newContext();   // if XXX=context  then Line 45/46 is not required
  const page = await context.newPage();// if XXX=page  then Line 45/46/47 is not required
  await page.goto("https://testautomationpractice.blogspot.com/"); // We can start from here if xxx = page variable
}); */

test('Multiple pages from single context',async() =>{
const browser = await firefox.launch(); // Launch a browser
const context = await browser.newContext();  // Create a browser context

// Creating pages:
const page1 = await context.newPage(); 
const page2 = await context.newPage();
const page3 = await context.newPage();
console.log("No. of pages created:",context.pages().length);

await page1.goto("https://testautomationpractice.blogspot.com/");
await expect(page1).toHaveTitle("Automation Testing Practice");

await page2.goto("https://playwright.dev/docs/pages");
await expect (page2).toHaveTitle("Pages | Playwright")

await page3.goto("https://www.pavantestingtools.com/");
await expect(page3).toHaveTitle("SDET-QA Blog");

await page1.goto("https://www.youtube.com/@sdetpavan/videos"); // Here if we use same page then old url get replaced by new one
await expect(page1).toHaveTitle("SDET- QA - YouTube");

});



