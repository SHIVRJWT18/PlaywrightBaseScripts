import {test,expect} from '@playwright/test';
import fs from 'fs';
import * as XLSX from 'xlsx';


/*Excel - To read the excel file different packages are available such as JXL (Javascript Excel) and 
          XLSX.
1. By Default Javascript/Typescript has built-in support JSON format. 
2. Therefore whatever the data we have in Excel (XLSX format) will be convert to JSON format then 
   use the same Json approach 
3. To prase Excel to Json we need to install XLSX module
> npm install xlsx                
*/

// Reading data from the Excel File: File-->Workbook-->sheets-->rows & Columns 
const excelpath1 = "tests/35.DataParametrization/5.1. ExcelTestData.xlsx"; // Forward slash is used
const workbook = XLSX.readFile(excelpath1);
const sheetname = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetname];
//converting Sheets into JSON format
const logindata:any = XLSX.utils.sheet_to_json(worksheet);  // data is in JSON Format 
console.log(logindata);

test.describe('Valid Login Test', () => {
for(const getjsondata of logindata) {
console.log("Check data:",getjsondata);
test(`Login valid user: ${getjsondata.username} and password: ${getjsondata.password}`, async ({page}) => {
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
await expect (page).toHaveTitle('OrangeHRM');
await page.waitForTimeout(3000);
await page.locator("input[placeholder='Username']").fill(getjsondata.username); 
await page.locator("input[placeholder='Password']").fill(getjsondata.password); 
await page.locator("button[type='Submit']").click(); 
if(getjsondata.state.toLowerCase()==='valid')
{    
console.log(await page.locator("span.oxd-topbar-header-breadcrumb").innerText());
await expect (page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
}
else
{
 console.log(await page.locator("p.oxd-text.oxd-text--p.oxd-alert-content-text").innerText());
 await expect (page.locator("p.oxd-text.oxd-text--p.oxd-alert-content-text")).toBeVisible();
 await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");      
 }
});
}
});


// Simple Login Test
const xcelpath = "tests/35.DataParametrization/5.2. ExcelLoginData.xlsx";
const workbook1 = XLSX.readFile(xcelpath);
const sheetname1 =workbook1.SheetNames[0];
const worksheet1 = workbook1.Sheets[sheetname1];
const jsondata:any =  XLSX.utils.sheet_to_json(worksheet1); 

test('Simple Login Test', async ({page}) => {
const xceldata = jsondata[0];  // Pass index 1 to view negative flow
await page.goto("https://practice.expandtesting.com/login");
await expect (page).toHaveTitle('Test Login Page for Automation Testing Practice');
await page.locator("#username").fill(xceldata.username); 
await page.locator("#password").fill(xceldata.password); 
await page.locator("#submit-login").click(); 

if(xceldata.state.toLowerCase()==='valid')
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
