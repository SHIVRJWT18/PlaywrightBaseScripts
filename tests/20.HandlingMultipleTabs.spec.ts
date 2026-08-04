import {test,expect,firefox} from '@playwright/test';

test('Handle Tabs',async() =>{    // Creating Custom browser and Context 
const browser = await firefox.launch(); // Create a firefox browser
const context = await browser.newContext();   // Create a firefox context

const parentpg = await context.newPage(); // Creating Page 1

await parentpg.goto("https://testautomationpractice.blogspot.com/");

/* These 2 stmt run prallelly and both return different promises which we need to capture through promise.all()
1= context.waitForEvent('page');  // Return a promise of page that may be pending,fulfilled and rejected 
2= parentpg.locator("button:has-text('New Tab')").click(); // It opens a new tab or new page */

// Now below line further return a new promise based on combining promise result of above 2 stmt 
const [childPg] = await Promise.all([context.waitForEvent('page'),parentpg.locator("button:has-text('New Tab')").click()]);

// Approach 1:- Switch between the pages and fetch the title
const pages =   context.pages() // Returns a array of pages
console.log("No. of Pages/Tab:",pages.length)
console.log("Pg 1 title:",await pages[0].title());
console.log("Pg 2 title:",await pages[1].title());

// Approach 2:- Using direct use of parentpg and childpage
console.log("Title of first pg:",await parentpg.title());
console.log("Title of secondg pg:", await childPg.title());

//NOTE:- When we have only 2 pages i.e parent and child then recommend to use Approach 2: otherwise 
/* When we have multiple parent or multiple tabs then we can't say which one is parent/child
/* so we need to capture all the pages in the Page using context and access those pages with indexes 
   similar to approach 1: */

});
