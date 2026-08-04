import {test,expect,Locator} from '@playwright/test';
import fs from 'fs'; // fs -- File System

// Fetching Json data
const jsonPath = "tests/35.DataParametrization/3.1. JsonTestData.json";  // Forward slash is used
const regdata:any = JSON.parse(fs.readFileSync(jsonPath,'utf-8')); // UTF - Unified Transformation Format

test.describe('Valid Register Test', async () => {
for(const userid of regdata["New credentials"])    
test(`Register valid user ${userid.username}`, async ({page}) => {
await page.goto("https://practice.expandtesting.com/register");
await expect (page).toHaveTitle('Test Register Page for Automation Testing Practice');
await page.locator("#username").fill(userid.username); 
await page.locator("#password").fill(userid.password); 
await page.locator("#confirmPassword").fill(userid.confirmpassword); 
await page.locator("button[type='submit']").click(); 
console.log(await page.locator("#flash").innerText());
await expect (page).toHaveURL("https://practice.expandtesting.com/login");
})
});

// Run only one specific index
test.describe('In valid Register Test', async () => {  // User already registered 
const userid = regdata["Already registered"][0];
test(`Register Invalid user ${regdata["Already registered"][0].username}`, async ({page}) => {
await page.goto("https://practice.expandtesting.com/register");
await expect (page).toHaveTitle('Test Register Page for Automation Testing Practice');
await page.locator("#username").fill(userid.username); 
await page.locator("#password").fill(userid.password); 
await page.locator("#confirmPassword").fill(userid.confirmpassword); 
await page.locator("button[type='submit']").click(); 
console.log(await page.locator("#flash").innerText());
await expect (page).toHaveURL("https://practice.expandtesting.com/register");
})
});

// Simple Login Test
const jsonPath1 = "tests/35.DataParametrization/3.2. JsonLoginData.json";
const credgdata:any = JSON.parse(fs.readFileSync(jsonPath1,'utf-8')); 

test('Simple Login Test', async ({page}) => {
const data = credgdata.credentials[0];   // Pass index 1 to view negative flow
await page.goto("https://practice.expandtesting.com/login");
await expect (page).toHaveTitle('Test Login Page for Automation Testing Practice');
await page.locator("#username").fill(data.username); 
await page.locator("#password").fill(data.password); 
await page.locator("#submit-login").click(); 

if(data.state.toLowerCase()==='valid')
{    
 console.log(await page.locator("#flash").innerText());
 await expect (page).toHaveURL("https://practice.expandtesting.com/secure");
}
 else
{
  console.log(await page.locator("#flash").innerText());

 await expect (page.locator("#flash")).toBeVisible();
 await expect(page).toHaveURL("https://practice.expandtesting.com/login");   
}

});
