import {test,expect,Locator} from '@playwright/test';

/* Data Parameterization - Passing data to tests
1. Parameterization allows the same test to run multiple times with different input data.
2. It is also known as data-driven testing, where test execution is driven by external or predefined data.
3. Parameterization can be achieved through:
   3.1 Default parameterization – data is defined in the same test file.
   3.2 External files – JSON, CSV, or Excel.
4. JSON is the most preferred format due to its native support in JavaScript-based automation frameworks.
5. Preferred order for test data files: JSON > CSV > Excel.

NOTE: Dublicate test method name are not allowed
*/   

//A: Parameterization using For-Of Loop:
const itemNames:string[] = ["Laptop","Monitor","Computer","Gift Card"];  // Monitor - Fail (No search result)
for(let item of itemNames)
{
test(`Successful ${item} Search`, async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
await page.locator("#small-searchterms").fill(item);
await page.locator('input[value="Search"]').click(); 
await expect.soft (page.locator('h2 a').nth(0)).toContainText(item , {ignoreCase:true});
})
};

//B: Parameterization using For-Each Function:
const searchItem:string[] = ["Expensive","Virtual","Build","simple"];
searchItem.forEach((item) => {
test(`Successful ${item} Search`, async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
await page.locator("#small-searchterms").fill(item);
await page.locator('input[value="Search"]').click(); 
await expect (page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase:true});
})
});

// We can put test code inside describe block 
test.describe('Searching Items', async () => {
const searchItem:string[] = ["Internet","Desktop","Jeans","Vintage"];
searchItem.forEach((item) => {
test(`Successful ${item} Search`, async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
await page.locator("#small-searchterms").fill(item);
await page.locator('input[value="Search"]').click(); 
await expect (page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase:true});
})
})
});

