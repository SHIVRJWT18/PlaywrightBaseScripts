import {test,expect,Page} from '@playwright/test';

test('Handle PopUps',async({browser}) =>{ 
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/"); 

//Multiple Popups
/* These 2 stmt run prallelly and both return different promises which we need to capture through promise.all()
1 = await page.waitForEvent('popup');
2 = await page.locator("[onclick='return popup()']").click(); */

await Promise.all([page.waitForEvent('popup'),await page.locator("#PopUp").click()]);
const allpopups = context.pages(); // Return array of pages
console.log("No. of pages:",allpopups.length); //  Return count of 1 popups + 1 main page =2

console.log(allpopups[0].url()); // Main Page 
console.log(allpopups[1].url()); // child page
//console.log(allpopups[2].url()); // Popup page

for(const popups of allpopups)
{
    const title = await popups.title();
    if(title.includes('Selenium'))
    {
     await popups.getByText('Visit Conference Website for more information!').click();
     await popups.close();
    }    
}    
 await page.waitForTimeout(4000);

});    
test('Handle Authentication PopUps',async({browser}) =>{ 
// Approach 1:(Recommended) Inside browser context we need to pass Login credetials    
const context = await browser.newContext({httpCredentials:{username:'admin',password:'admin'}}); 
const page = await context.newPage();
await page.goto("https://the-internet.herokuapp.com/"); 
await page.waitForLoadState(); // Wait for page to load completely
await page.locator("//a[text()='Basic Auth']").click();
await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();

// Approach 2: Inside Url we need to pass Login credetials    
// Syntax: https://username:password@the-internet.herokuapp.com/
await page.goto("https://the-internet.herokuapp.com/login"); 
await page.locator("//a[text()='Basic Auth']").click();

await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth"); 
await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();

});