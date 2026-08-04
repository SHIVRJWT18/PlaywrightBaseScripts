import { test, expect, Locator } from '@playwright/test';

/*Locators:
1. Locators are the central piece of Playwright's auto-waiting and retry-ability. 
2. It represent a way to find element(s) on the page at any moment.
3. These are the recommended built-in locators.
  3.1 page.getByRole() -> to locate by explicit and implicit accessibility attributes.
  3.2 page.getByText() -> to locate by text content. (Non - interactive elements)
  3.3 page.getByLabel() -> to locate a form control by associated label's text.
  3.4 page.getByPlaceholder() -> to locate an input by placeholder.
  3.5 page.getByAltText() -> to locate an element, usually image, by its text alternative.
  3.6 page.getByTitle() -> to locate an element by its title attribute.
  3.7 page.getByTestId() -> to locate an element based on its data-testid attribute 
    (other attributes can be configured). */

test("1. Verify Image Elem", async ({page})=>{
// page.getByAltText() - identifies images based on the alt attribute such as img and area element
  await page.gotp/playwrightpractice.html");
  const logoElem:Locator = page.getByAltText("logo image"); // await is not needed here because the return type is a locator, not a Promise.
  await expect(logoElem).toBeVisible();
});

test("2. Verify Visible Text Elem", async ({page})=>{
// page.getByText() - Find the element by the inner text it contains. It can be substring, regular expression or exact string
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html"); 
const text:Locator = page.getByText("Locate elements by their text content."); // provided full String
await expect(text).toBeVisible();

await expect(page.getByText("for demonstration.")).toBeVisible(); //provided substring
await expect(page.getByText(/locate\s+elements\s+by\s+their\s+text\s+content/i)).toBeVisible();; //provided regular expression to ignore the case sensitive
// here i refer to ignore case senstive
});

test("3. Verify Interactive Elem", async ({page})=>{
/* page.getByRole() - Locating by Role (Role is not an attribute). Role is defined based on the element type.
  Implicit accessibility attributes - Those attributes where the role and tag attribute are same.
for Ex- <button role="button">Primary Action</button> // Here role & tag having same type called button
        page.getByRole('button',{name: /Primary Action/i})
  Explicit accessibility attributes - Those attributes where the role and tag attribute are different.
for Ex- <h3> Sign Up </h3> // Here role is heading & tag is h3
        page.getByRole('heading',{name: 'Sign Up'})
*/
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html"); 
await page.getByRole('menuitem').getByRole("link",{name: "Home"}).first().click();
const headingElem:Locator = page.getByRole("heading",{name: "PlaywrightPractice"});
await expect(headingElem).toBeVisible();
});

test("4. Verify InputField Elem", async ({page})=>{
// page.getByLabel() - Locate for form fileds with visible labels 
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html"); 
await page.getByLabel('Email Address:').fill("abc123@gmail.com");
await page.getByLabel('Password:').fill("abc1234");
await page.getByLabel('Your Age:').fill('34');
});

test("5. Verify Placeholder Elem", async ({page})=>{
// page.getByPlaceholder() - find the element with a given placeholder text
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html"); 
await page.getByPlaceholder('Enter your full name').fill("Rakesh Bhadoria");
await page.getByPlaceholder('Phone number (xxx-xxx-xxxx)').fill("9792790940");
await page.getByPlaceholder('Type your message here...').fill('The message has been posted');
});

test("6. Verify Title Elem", async ({page})=>{
// page.getByTitle() - find the element by its title attribute
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html"); 
const tileElem:Locator = page.getByTitle('Tooltip text');
await expect(tileElem).toHaveText('This text has a tooltip');
await expect(page.getByTitle('HyperText Markup Language')).toHaveText('HTML');
});

test("7. Verify Test_id Elem", async ({page})=>{
// page.getByTitle() - Locate the element based on its data test-id attribute and it can be customizable
// Here if developer change the attribute name but not change the value then in that case its works fine
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html"); 
const tileElem:Locator = page.getByTestId('profile-email');
await expect(tileElem).toHaveText('john.doe@example.com');
await expect(page.getByTestId('edit-profile-btn')).toHaveText('Edit Profile');

/*For Ex- Suppose later developer change data-testid="edit-profile-btn" to btn-testid ="edit-profile-btn" in below Html 
  <button data-testid="edit-profile-btn">Edit Profile</button>
Then we have to customize this inside playwright.config.ts by adding below code after that same getByTestid locator work for this change 
use: {
    trace: 'on-first-retry',
    testIdAttribute: 'btn-testid'  <This configuration needs to be added for data-testid inside Playwright.config.ts>
  }, */
});

test("8. Handle Dynamic Element with PW Locators", async ({ page })=>{
await page.goto("https://testautomationpractice.blogspot.com/"); 
const btn = page.getByRole('button', {name: /start|stop/i });
await btn.click();

});  
