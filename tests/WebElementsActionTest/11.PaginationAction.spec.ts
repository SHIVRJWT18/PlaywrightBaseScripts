import {test,expect,Locator} from '@playwright/test';
//1 . Handling Pagination Web table
test('Pagination WebTable Actions', async ({page}) => {
await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
await expect(page.locator("li.breadcrumb-item.active")).toBeVisible();
// Read all table data from all the pages: (check No. of Pages then No. of rows)
let hasmorePages = true;
// As no. of pages are dynamic in nature, so use while loop

while(hasmorePages) 
{
const nrow =  await page.locator("#example > tbody > tr").all(); // Return all the rows from the page 
for(let rw of nrow)
{    
console.log(await rw.innerText());    
}
await page.waitForTimeout(4000);

const nextbtn:Locator = page.locator("[data-dt-idx='next']");
 
const isdisable = await nextbtn.getAttribute('aria-disabled'); 
if(isdisable == "true")
{
    hasmorePages = false;
}
else {
   await nextbtn.click(); 
}
}

/* NOTE: While inspecting disabled Next/previous btn to ensure no more pages left in pagination 
   check class attribute when if no unique attribute found. 
   
   for e.g <li class="paginate_button page-item next disabled" id="example_next"><a aria-controls="example" aria-disabled="true" aria-role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li>
*/

/********To Handle this ************************************************* 
const isdisable = await nextbtn.getAttribute('class'); 
if(isdisable?.includes('next disabled'))
{
    hasmorePages = false;
}
else {
   await nextbtn.click(); 
} */

}); 
test('Filter Rows Action',async ({page}) => {
await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
const drpdwn: Locator =  page.locator("[name='example_length']");  
await drpdwn.selectOption("10");
// Approach 1
const rowsA = await page.locator("tbody#demo tr").all();
expect(rowsA).toHaveLength(10); // assertion
// Approach 2
const rowsB = page.locator("tbody#demo tr");
await expect(rowsB).toHaveCount(10);  

});
test('Search Rows Action',async ({page}) => {
await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
const srchbx:Locator = page.locator("input.form-control.form-control-sm");
//await srchbx.fill("rtyuiokljhgbvcgbhbjkl");
await srchbx.fill("Bob Williams");

const row = await page.locator("tbody#demo tr").all();
if(row.length>=1)
{
   for(let rw of row)
   {
      const getdta = await rw.innerText();
      if(getdta.includes('Williams'))
      {
         console.log("Records exist", await rw.innerText());
         expect(await rw.count()).toBe(1);
         break;
      } 
      else
      {
        console.log("Error:", await rw.first().innerText());
     }        
   }   
}

});