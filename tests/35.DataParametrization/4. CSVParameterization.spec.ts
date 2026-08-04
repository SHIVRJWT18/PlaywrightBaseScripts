import {test,expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

/*Csv - In Csv First row is header and data starts form next row and values is separated by comma
1. By Default there is no support for csv in typescript. Need to install third party library for csv
> npm install csv-parse   // Install a CSV parser library to read data from a CSV file. 
2. Using this library, pass the CSV file path to the parser to read and extract the test data.
3. Add this import statement - import {parse} from 'csv-parse/sync'; 
*/

interface CsvData {
  username: string;
  password: string;
  state: string;
}

// Reading data from the CSV File
const csvpath = "tests/35.DataParametrization/4.1. CsvTestData.csv"; // Forward slash is used
const filecontent = fs.readFileSync(csvpath,'utf-8'); // fileContent contains the entire CSV data.

//Prasing the CSV data in columns
const record: CsvData[] = parse(filecontent, {columns:true, skip_empty_lines:true});

/* NOTE:  filecontent read the whole content from the csv file. Here Each line treat as one record from 
          the entire content. We have to grab each & every line in forms of records. Hence we need to 
          Parse it to split the content into individual records, where each line represents one record.
*/

test.describe('Valid Login Test', () => {

for(const getcsvdata of record)

test(`Login valid user: ${getcsvdata.username} and password: ${getcsvdata.password}`, async ({page}) => {
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
await expect (page).toHaveTitle('OrangeHRM');
await page.locator("input[placeholder='Username']").fill(getcsvdata.username); 
await page.locator("input[placeholder='Password']").fill(getcsvdata.password); 
await page.locator("button[type='Submit']").click(); 
if(getcsvdata.state.toLowerCase()==='valid')
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
})
});


// Simple Login Test
const csvPath1 = "tests/35.DataParametrization/4.2. CsvLoginData.csv";
const csvcontent = fs.readFileSync(csvPath1,'utf-8'); // fileContent contains the entire CSV data.
const fetchdata: CsvData[] = parse(csvcontent, {columns:true, skip_empty_lines:true}); //Prasing the CSV data in columns

test('Simple Login Test', async ({page}) => {
const input =  fetchdata[0];  // Pass index 1 to view negative flow
await page.goto("https://practice.expandtesting.com/login");
await expect (page).toHaveTitle('Test Login Page for Automation Testing Practice');
await page.locator("#username").fill(input.username); 
await page.locator("#password").fill(input.password); 
await page.locator("#submit-login").click(); 

if(input.state.toLowerCase()==='valid')
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
