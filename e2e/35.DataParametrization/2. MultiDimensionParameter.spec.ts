import {test,expect,Locator} from '@playwright/test';


const credentials:string[][] = [
["student","Password123", "Valid"],
["teacher","Password123", "Invalid"],
["parent","Mother", "Invalid"],
["","Password", "Invalid"],
["student","", "Invalid"],
["","", "Invalid"],
];

test.describe('Login Test', async () => {
for(const [userid, password,validity] of credentials) {    
test(`Login for ${userid} and ${password}`, async ({page}) => {
await page.goto("https://practicetestautomation.com/practice-test-login/");
await expect (page).toHaveTitle('Test Login | Practice Test Automation');
await page.locator("#username").fill(userid); 
await page.locator("#password").fill(password); 
await page.locator("#submit").click(); 
if(validity.toLowerCase()==='valid')
{    
 console.log(await page.locator("div.post-content strong").innerText());
 await expect (page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");
}
 else
{
 const errmsg:Locator = page.locator("#error").first();   
 console.log("Error Msg:",await errmsg.innerText());
 await expect (errmsg).toBeVisible();
 await expect(page).toHaveURL("https://practicetestautomation.com/practice-test-login/");   
}
})
}
});


