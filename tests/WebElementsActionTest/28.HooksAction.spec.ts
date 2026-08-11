import { test, expect, Locator, Page, locator } from '@playwright/test';
/* Playwright Hooks- (Similar to Testng)
1. Hooks are used for manage the test files in which order tests would be executed to promote code-reusability.
2. There are 4 types of annotations are there-
    @beforeAll | @BeforeEach | @AfterAll | @AfterEach 
3. We should place all hook methods outside the test groups so they can be shared and accessed by 
   tests belonging to different groups.
*/
test.describe('Hooks flow', async () => {

test.beforeAll('Before All Hooks', async () => {   // This block execute once before all test method
console.log("Application loads successfully --> Before All Hook is executed");    
});

test.beforeEach('Before Each Hooks', async () => {   // This block execute before each test method
console.log("Login successfully --> Before Each Hook is executed");    

});

test('Normal test', async () => {                 // This block execute in between: before & after test method 
console.log("Dashboard loaded successfully --> Normal test is executed");    

});

test.afterAll('After All Hooks', async () => {    // This block execute once after all test method
console.log("Application is closed successfully --> After All Hook is executed");

});

test.afterEach('After Each Hooks', async () => {   // This block execute once after each test method
console.log("Logout is done --> After Each Hook is executed");

});

});

// We can move all the hooks method outside of the group = Hooks Implementation in Script 
let getpage: Page; 
test.beforeAll("Launch Application", async ({browser}) => {
getpage = await browser.newPage();
await getpage.goto("https://automationexercise.com/");
await getpage.waitForTimeout(2000);

});

test.afterAll("Closing Application", async () => {
await getpage.close();
});

test.beforeEach("Login Application", async () => {
await getpage.locator("a[href='/login']").click();
await getpage.locator("input[data-qa='login-email']").fill("msch123@gmail.com");
await getpage.locator("input[data-qa='login-password']").fill("Test1234");
await getpage.locator("button[data-qa='login-button']").click();
await getpage.waitForTimeout(2000);
console.log(await getpage.locator("div.shop-menu.pull-right a").nth(9).innerText());

});

test.afterEach("Logout Application", async () => {
await getpage.locator("a[href='/logout']").click();
console.log("Logout is Successful");
await getpage.waitForTimeout(2000);

});

test.describe('Hooks Implementation in Script', async () => {
  
test('Get brands of product', async () => {
const brandname = getpage.locator('div.brands_products li a');
const allbrands = await brandname.allTextContents();
console.log("Get brand names:",allbrands);
await getpage.waitForTimeout(2000);

});

test('Add product to cart', async () => {
const productName = "Premium Polo T-Shirts";  
await getpage.locator("a[href='/brand_products/Polo']").click();
const itemname = getpage.locator('div.overlay-content p');
const allitems = await itemname.allInnerTexts();
console.log("Get items names:",allitems);
if((allitems).includes(productName))
{
await getpage.locator(`div.single-products:has(p:has-text("${productName}"))`).hover();
}
const itemadded = await getpage.locator(`.single-products:has(p:has-text("${productName}")) a`).first().click();
const modal = getpage.locator("#cartModal");

await expect(modal).toBeVisible();

const title = await modal.locator("h4.modal-title").innerText();
const message = await modal.locator("div.modal-body p").allInnerTexts();
await modal.locator("div.modal-body a").click();

console.log("Item status: " + title + " " + message);
expect (message).toContain("Your product has been added to cart.");
await getpage.waitForTimeout(2000);

}); 

test('View product inside cart', async () => {
await getpage.locator("a[href='/view_cart']").first().click(); // Click view cart
const itemname = getpage.locator('#cart_info_table td h4 a');
console.log("Get items names:",await itemname.allInnerTexts());
if((await itemname.allInnerTexts()).includes('Premium Polo'))
{
  console.log("Product is available in cart");
}
else
{
  console.log("Product is not available in cart");
}    
});


});
