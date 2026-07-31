import { test,expect,Locator,Page } from '@playwright/test';
//1. Utility for selecting future/past date from date picker
async function chooseDate(targetYear:string,targetMonth:string,targetDate:string,page:Page,isFuture:boolean,dateTextbox:Locator)
{
while(true)
{
    const currentmonth=await page.locator('.ui-datepicker-month').textContent();
    const currentyear=await page.locator('.ui-datepicker-year').textContent();
    if(currentmonth===targetMonth && currentyear===targetYear)
    {
        break;
    }  
    if(isFuture)
    {
     await page.locator(".ui-datepicker-next > span").click();   
    }
    else
    {
     await page.locator(".ui-datepicker-prev > span").click(); 
    }        
}    
  const alldates = await page.locator('.ui-datepicker-calendar td').all();
  for(let dt of alldates) 
  {
    const dttext=await dt.innerText();
    if(dttext===targetDate)
    {
        await dt.click();
        break;
    }    
  }
  console.log("Selected date from date picker:",await dateTextbox.inputValue());  
}


// Calling utility method
test('Calling DatePicker Utility',async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const frmdate:Locator = page.locator("input#datepicker");
await frmdate.click();
await chooseDate("2024","March","6", page, false, frmdate); // isfuture --> true = Future || false = past
await expect(frmdate).toHaveValue("03/06/2024");
});

// 2. Only Future Date Picker
test('Jquery Future DatePicker Action',async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const frmdate:Locator = page.locator("input#datepicker");
await expect(frmdate).toBeVisible();

//1. Using Fill Method
frmdate.fill("04/05/2025"); // mm/dd/yyyy
await page.waitForTimeout(4000);
console.log("Selected date using fill():",await frmdate.inputValue());
await expect(frmdate).toHaveValue("04/05/2025");

//2. Select the future target date using date picker: 18 Nov 2028
const year = '2028';
const month = 'November';
const date ='18';
while(true)
{
 const currentmonth:string =  await page.locator(".ui-datepicker-month").innerText();  
 const currentyear:string =  await page.locator(".ui-datepicker-year").innerText();  

 if(currentmonth === month && currentyear === year)
 {
    break;
 }
  // Future   
  await page.locator(".ui-datepicker-next > span").click(); 
}

  const alldates = await page.locator(".ui-datepicker-calendar td").all();
  for(let getdate of alldates)
  {
    const datetext = await getdate.innerText()
    if(datetext === date) {// Line 15
    
    await getdate.click();
    break;
    }
  } 
  await page.waitForTimeout(4000);
  console.log("Selected date from date picker:",await frmdate.inputValue()); 
});

// 3. Only Past Date Picker
test('Jquery Past DatePicker Action',async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const frmdate:Locator = page.locator("input#datepicker");
await expect(frmdate).toBeVisible();

//1. Using Fill Method
frmdate.fill("04/05/2014"); // mm/dd/yyyy
await page.waitForTimeout(4000);
console.log("Selected date using fill():",await frmdate.inputValue());
await expect(frmdate).toHaveValue("04/05/2014");

//2. Select the given target date using date picker: 15 Aug 2016
const year = '2016';
const month = 'August';
const date ='15';
while(true)
{
 const currentmonth:string =  await page.locator(".ui-datepicker-month").innerText();  
 const currentyear:string =  await page.locator(".ui-datepicker-year").innerText();  

 if(currentmonth === month && currentyear === year)
 {
    break;
 }
  // Past    
     await page.locator(".ui-datepicker-prev > span").click(); 
  
  //await page.locator(".ui-datepicker-next > span").click(); ---> Future

}

  const alldates = await page.locator(".ui-datepicker-calendar td").all();
  for(let getdate of alldates)
  {
    const datetext = await getdate.innerText()
    if(datetext === date) {// Line 15
    
    await getdate.click();
    break;
    }
  } 
  await page.waitForTimeout(4000);
  console.log("Selected date from date picker:",await frmdate.inputValue()); 
       //   await page.locator(".ui-datepicker-prev > span").click(); 
});



