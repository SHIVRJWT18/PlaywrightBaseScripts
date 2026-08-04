import { test,expect,Locator } from '@playwright/test';

// 1. Single option - Select Dropdown
test('Single Select DrpDwn', async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
await page.locator("#country").selectOption('India'); // Get by using Visible Text
await page.locator("#country").selectOption({value:'china'}); // Get by using Value attribute
await page.locator("#country").selectOption({label:'Germany'}); // Get by using Label
await page.locator("#country").selectOption({index:5}); // Get by using Index

// count no. of Options inside Drop Down
const drpdwn:Locator = page.locator('#country >option') 
await expect(drpdwn).toHaveCount(10);

//check an option present in the dropdown
const optnList:string[] = await drpdwn.allTextContents();
const getoptns:String[] = optnList.map(optntext => optntext.trim()); 

console.log("DropDown Options: ",getoptns);
expect(getoptns).toContain('Japan'); // Checking Japan is present or not

});

// 2. Multi - Select Dropdown
test('Multi Select DrpDwn', async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
// Multi option - Select Dropdown
await page.locator("#colors").selectOption(["Red","Blue","Green"]);  // Get by using Visible Text 
await page.locator("#colors").selectOption(["red","green"]);  // Get by using Value attribute
await page.locator("#colors").selectOption([{label:"White"},{label:"Blue"}]);  // Get by using Label
await page.locator("#colors").selectOption([{index:3},{index:1},{index:4}]); // Get by using Index

// count no. of Options inside Drop Down
const drpdwn:Locator = page.locator('#colors >option') 
await expect(drpdwn).toHaveCount(7);

//check an option present in the dropdown
const alloptnList:string[] = await drpdwn.allTextContents();
const getalloptns = alloptnList.map(optntext => optntext.trim()); 
console.log("Multi DropDown Options: ",getalloptns);
expect(getalloptns).toContain('Yellow'); // Checking Japan is present or not

// Finding dublicate option in drop down
const alloptins:string[] = (await drpdwn.allTextContents()).map(optntext => optntext.trim());
const dublictaes: string[] =[]; 
const data = new Set<string>();
for(const getvalue of alloptins)
{
  if(data.has(getvalue))
  {
    dublictaes.push(getvalue);
  }  
  else
  {
    data.add(getvalue);
  } } 
  if(dublictaes.length>0)
  {
    console.log("Dublicate Value: ",dublictaes)
  }  
  else
  {
    console.log("No dublicates are found");
  }

});
// Sorting Options inside Select Dropdown
test('Sorted Option DrpDwn', async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const drp:Locator = page.locator('select[name="animals"] > option');
const OriginalList: string[] = (await drp.allTextContents()).map(optntext => optntext.trim());
console.log("Original List: ", OriginalList);
const processedList: string[] = ([...OriginalList].sort().map(text => text.trim())); // Here 3 dot is spread Operator
console.log("Sorted List: ", processedList);
expect(OriginalList).toEqual(processedList); 
});

// 3. Auto-Suggest Drop down (Without having select tag)
test('Auto Sugget Drpdwn',async ({page}) => {
await page.goto("https://www.flipkart.com/");
await page.getByRole('button', { name: '✕' }).click();
await page.locator("form.header-form-search input[name='q']").fill('Smart Tv');
await page.waitForTimeout(5000);
// Get all the suggestion options --> ctrl+shift+p on the DOM --> Emulate a focused Page
const allOptions:Locator = page.locator("ul > li");
const suggcount: number = await allOptions.count();
console.log("No. of option suggested: ",);
await page.waitForTimeout(5000);
for(let i=0;i<suggcount;i++)
{
    //const text = await allOptions.nth(i).innerText();
     const text = await allOptions.nth(i).textContent();
    console.log(`Option ${i + 1}: ${text}`);

}  
// selecting specific option
  for(let i=0;i<suggcount;i++)
{
    const prodname: string= await allOptions.nth(i).innerText();

    if(prodname == 'smart tv sticks') {
     await allOptions.nth(i).click();
    console.log(`Selected Option ${i}: ${prodname}`);
    break;
}  }
});

/* Basic Difference: textcontent() used to fetch the element name while innertext() used for input box/visible text
ex1. <span> smart </span>  == uses inner text() 
ex2. <span> label:country name:India </span> == uses textContent() */

// 4. Hidden options Drop down (Without having select tag)
test('Hidden options Drpdwn',async ({page}) => {
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
await page.locator("[placeholder='Username']").fill("Admin");
await page.locator("[placeholder='Password']").fill("admin123");
await page.locator("button[type='submit']").click();
const pageHeading: string = await page.locator("//h6[text()='Dashboard']").innerText();
expect(pageHeading).toBe('Dashboard');
await page.locator("//span[text()='PIM']").click();
// Click on job title
await page.locator('form i').nth(2).click();  
await page.waitForTimeout(4000);
const getalloptn: Locator = page.locator("[role='listbox'] span");
console.log("No. of Options: ",await getalloptn.count());
console.log("Dropdwn Options: ",await getalloptn.allTextContents());
// selecting specific option
for(let i=0;i<(await getalloptn.count());i++)
{
    const getjob: string = await getalloptn.nth(i).innerText();
    if(getjob == 'Automation tester')
    {
        await getalloptn.nth(i).click();
        break;
    }       
}    
});