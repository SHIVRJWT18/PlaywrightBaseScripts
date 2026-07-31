import {test,expect} from '@playwright/test';

test('Assertions in PW', async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");

//1. Auto-retrying assertions (automatically retries until its passes ot timeout)
await expect(page).toHaveURL('https://demowebshop.tricentis.com/'); // Waits for correct URL | dealing with page

// Auto retey: waits for the element to be visible an expected text
await expect(page.locator('text=Welcome to our store')).toBeVisible();
await expect(page.locator("div.title").nth(3)).toHaveText("Newsletter"); // deal with locator

// 2.  Non-retrying assertions (executes immediately, no retry)
const radiochecks = await page.locator("#poll-block-1 li").count();
expect (radiochecks).toBe(4); // comparing value

const gettricentis = await page.locator("div.block.block-manufacturer-navigation a").textContent();
expect (gettricentis).toContain('Tricentis'); // no auto retry // comparing value

//3. Neglacting Matcher (Applicable for both auto retrying & Non-auto retrying)
const voteBtn = await page.locator("div.block.block-poll #poll-block-1").textContent();
expect(voteBtn).not.toContain("Subscribe");

}); 

test('Hard Vs Soft Assertions', async ({page}) => {
await page.goto("https://demowebshop.tricentis.com/");
1. /* Hard Assertions: If any assertion got failed the rest of the code won't be executed. It
will immediately terminate the test. */ 

await expect (page).toHaveTitle("Demo Web Shop"); // Here this is auto Retries assertion as deal with page
const logo =  page.locator("[alt ='Tricentis Demo Web Shop']");
await expect (logo).toBeVisible(); // this is also auto Retries assertion as deal with locator

2. /* Soft Assertions: If any assertion got failed even though rest of the assertions will be executed. It
is not terminate the rest of the test. */ 
const searchbtn = page.locator("input.button-1.search-box-button");
await expect.soft(searchbtn).not.toBeVisible();  // fail this assertion 
const subscribebtn = page.locator("#newsletter-subscribe-button");
await expect.soft(subscribebtn).toBeVisible();
const votebtn = page.locator("#vote-poll-1");
await expect.soft(votebtn).toBeVisible();
}); 

/*NOTE:-
1. Hard Assertion Or Soft assertion can be fall under both auto retries assertions 
as well as non-retrying assertions.
2. If there are multiple assertion in a single test then soft assertion is used where as 
if there are single assertion in single test then use Hard Assertion*/