import {test,expect,Locator} from '@playwright/test';
 
//1 . Handling Static Web table
test('Static WebTable Actions', async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const statictable: Locator = await page.locator("[name='BookTable']  tbody");

// count no. of rows in table
const rows:Locator = statictable.locator("tr"); // Chaining of Locators
await expect(rows).toHaveCount(7); // direct use of assertion
const nrows:number = await rows.count();
console.log("No.of rows:",nrows);
expect(nrows).toBe(7); // Another way of assertion

// count no. of columns in table
const column:Locator = statictable.locator("tr>th "); // Chaining of Locators
await expect(column).toHaveCount(4);
console.log("No.of columns:",await column.count());

//Read the data from second row only
const secrow :Locator = rows.nth(2).locator('td');
const getcelldata: string[] = await secrow.allInnerTexts();
console.log("SecondRowData:",getcelldata);
await expect(secrow).toHaveText(['Learn Java','Mukesh', 'Java','500']); // assertion
//using for of loop
for(let celltext of getcelldata)
{
    console.log("Loop data:",celltext);
}    

// Read all the data excluding the header
const allrowdata = await rows.all(); // Getting all rows locator || all() -> return array of locators
for(let rows of allrowdata.slice(1)) // Here slice(1) -->skip header row
{
    const getcell = await rows.locator('td').allInnerTexts();
    console.log(getcell);
}    

// Print bookname where author name is Mukesh
const mukeshbook:string[]=[];
for(let rows of allrowdata.slice(1)) // Here slice(1) -->skip header row
{
    const getcell = await rows.locator('td').allInnerTexts();
    const author = getcell[1];
    const book = getcell[0];
    if(author == 'Mukesh')
    {    
    console.log(`${author} \t ${book}`);
    mukeshbook.push(book);
    }
}   
expect (mukeshbook).toHaveLength(2);

// Calculate the price of the all books
let totalprice =0;
for(let rows of allrowdata.slice(1)) // Here slice(1) -->skip header row
{
    const getcell = await rows.locator('td').allInnerTexts();
    const price = getcell[3];
    totalprice=totalprice+parseInt(price); // ParseInt used to convert string to integer 
}   
console.log("Totalprice:",totalprice);
expect(totalprice).toBe(7100); 
});

//2 . Handling Dynamic Web table
test('Dynamic WebTable Actions', async ({page}) => {
await page.goto("https://practice.expandtesting.com/dynamic-table");
const table: Locator = page.locator("table.table-striped > tbody");
await expect(table).toBeVisible(); 

// Get CPU load value for chrome
const rw: Locator[] = await table.locator("tr").all(); // Locator Chaining || Return Array of rows
console.log("No.of rows:",rw.length);
expect(rw).toHaveLength(4);
let cpuload, ntwrkload = "";
for(const getrow of rw)
{
    const processname:string = await getrow.locator("td").nth(0).innerText();
    if(processname == 'Chrome')
    {
      // Way1: CSS Syntax:-  
      cpuload = await getrow.locator('td:has-text("%")').innerText();  
      console.log("Chrome CPU Load:",cpuload);
      // Way2: PW Syntax:-
      ntwrkload = await getrow.locator("td",{hasText:'Mbps'}).innerText();
      console.log("Chrome Ntwk Load:",ntwrkload);
      break;
    }    
}    
// comapre CPU Load value
const getyellowboxload:String  = await page.locator(".bg-warning.p-1").innerText();
console.log("Yellow box value:",getyellowboxload);
expect(getyellowboxload).toContain(cpuload);
});   

