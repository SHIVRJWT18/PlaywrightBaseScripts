import { test, expect, Locator } from '@playwright/test';

test('Bootstrap DatePickers Action',async ({page}) =>{
await page.goto("https://www.booking.com/");  
const pageheading:Locator = page.locator("[data-testid=header-booking-logo]");
await expect (pageheading).toBeVisible();
await page.locator("button[aria-label='Dismiss sign-in info.']").click();

await page.locator("[data-testid='date-display-field-start']").click();
// Select the check in dates:
let checkInYear:string = "2027";
let checkInMonth:string = "May";
let checkInday:string = "18";

// Navigate to calender to find the check in duration
while(true)
{
 const checkInMonthYear = await page.locator("h3[id^='bui-calendar-month']").first().textContent();
 const currentmonth = checkInMonthYear?.split(" ")[0];
 const currentyear =  checkInMonthYear?.split(" ")[1];
 
 if(currentmonth===checkInMonth && currentyear===checkInYear)
 {
    break;
 }
 else
 {
    await page.locator("[aria-label='Next month'] svg").click();
 }
}

// select specific check in date
let alldates = await page.locator("table.b8fcb0c66a tbody").first().locator('td').all();
let checkInDateSelected = false;
for(let getdate of alldates)
{
  const datevalue = await getdate.innerText();
  if(datevalue===checkInday)
   {
    await getdate.click();
    console.log("Check in date Selected:",await getdate.innerText());
    checkInDateSelected=true;
    break;
   }    
}    
// Assertion to confirm check in date was selected
expect(checkInDateSelected).toBeTruthy();

// Checkout date selection
let checkOutYear:string = "2027";
let checkOutMonth:string = "June";
let checkOutday:string = "9"
 
// Navigate to calender to find the check out duration
while(true)
{
 const checkOutMonthYear= await page.locator("h3[id^='bui-calendar-month']").nth(1).innerText();
 const currentmonth = checkOutMonthYear.split(" ")[0];
 const currentyear = checkOutMonthYear.split(" ")[1];

 if(checkOutMonth===currentmonth && checkOutYear===currentyear)
 {
    break;
 }
 else
 {
   await page.locator("[aria-label='Next month'] svg").click(); 
 }      
}  
// select specific check out date
const alldates1 = await page.locator("table.b8fcb0c66a tbody").nth(1).locator('td').all(); 
let checkOutDateSelected = false;
for(let dtes of alldates1)
{
 const getdt = await dtes.innerText();
 if(getdt===checkOutday)
 {
    await dtes.click();
    console.log("Checkout date Selected:",await dtes.innerText());
    checkOutDateSelected=true;
    break;
 }      
}    
// Assertion to confirm check out date is selected
expect(checkOutDateSelected).toBeTruthy();

});