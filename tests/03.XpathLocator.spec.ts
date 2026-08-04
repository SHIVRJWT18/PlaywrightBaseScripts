import { test, expect, Locator } from '@playwright/test';

test("Static Xpath Locator with PW", async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/"); 

// 1. Absolute Xpath:
const name:Locator = page.locator("//html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/input[1]");
await expect(name).toBeVisible(); // Syntax -1
await name.fill("Pawan Kumar");
const phone:Locator = page.locator("xpath = /html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/input[3]")
await expect(phone).toBeVisible(); // Syntax -2

//2. Relative Xpath:
const emailloc:Locator =  page.locator("//input[@id='email']");
await expect(emailloc).toBeVisible();
await emailloc.fill("akg123@gmail.com"); 

//3. contains():
const links:Locator = page.locator("//a[contains(@href,'http:/')]");
const count:number = await links.count();
expect(count).toBeGreaterThan(1);
// console.log(await links.textContent()); Error: Multiples Matches
console.log("First Link:", await links.first().textContent()); // 1st index 
console.log("Fifth Link:", await links.nth(5).textContent()); // 5th index 
console.log("Last Link:", await links.last().textContent()); // nth index 
let getlinks: string[] = await links.allTextContents(); 
console.log(getlinks);
// Using Arrow fn
const hmelink = getlinks.filter(link => link.includes('Home'));
hmelink.forEach(link => console.log("Arrow Fn:",link));
// Normal way
for(const erlink of getlinks)
{
 if(erlink.includes('Errorcode')) {
 console.log(erlink);
}} 

//4. starts-with():
const searchbox: Locator = page.locator("//input[starts-with(@class,'wikipedia-search-inpu')]");
await expect(searchbox).toBeVisible();

//5. Visible Text():
const heading1: Locator = page.locator("//a[text()='Data Entry Form']");
console.log(await heading1.textContent()); 
const heading2: Locator = page.locator("//span[.='For Selenium, Cypress & Playwright']");
await expect(heading2).toBeVisible();

//6. Normalize Text():
const heading3: Locator = page.locator("//h1[normalize-space(text())='Automation Testing Practice']");
console.log(await heading3.textContent());

//7. Last() Element:
const rowL: Locator = page.locator("//table[@name='BookTable']//tr[last()]/td[1]");
await expect(rowL).toBeVisible();

//8. Position() Element:
const rowP: Locator = page.locator("//table[@name='BookTable']//tr[position()=5]/td[1]")
console.log("Positioned Element is:",await rowP.textContent());

});

test("Handling Dynamic Xpath Locator with PW", async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/"); 

// 1. Or Operator:
const strtBtnElem: Locator = page.locator("//button[@name='start' or @name='stop']");
await strtBtnElem.click();

// 3. starts-with()
const stopBtnElem: Locator = page.locator("//button[starts-with(@name,'sto')]");
await stopBtnElem.click();

// 2. contains()
const startbuttonElem: Locator = page.locator("//button[contains(@name,'sta')]");
await startbuttonElem.click();

// 4. text() = inner text
const stopbutnElem: Locator = page.locator("//button[.='STOP']");
await stopbutnElem.click();
});

test("Xpath Axes Locator with PW", async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/"); 
//1. self axis - select <th> element of the table heading
const selfElem: Locator = page.locator("//th[text()='Author']/self::th");
await expect(selfElem).toHaveText("Author");

//2. parent axis - get the parent <tr> of the <th> element
const parentElem: Locator = page.locator("//th[text()='Author']/parent::tr");
await expect(parentElem).toContainText("BookName");

//3. child axis - get all the child <td> of the first <tr> element
const childElem: Locator = page.locator("//table[@name='BookTable']//tr[2]/child::td");
console.log(await childElem.allTextContents());

//4. ancestor axis - get all the ancestor <th> element from first <td> element
const ancestorElem: Locator = page.locator("//table[@name='BookTable']//td/ancestor::tbody//th");
await expect(ancestorElem).toHaveCount(4);

//5. descendant axis - get all the <td> of the last <tr> from the table
const descendantElem: Locator = page.locator("//table[@name='BookTable']//tr[7]/descendant::td");
expect(await descendantElem.allTextContents()).toContain("1000");

//6. following axis - get remaining <th> from the second <th> element 
const followingElem: Locator = page.locator("//table[@name='BookTable']//th[2]/following::th");
expect(await followingElem.count()).toBeGreaterThan(10);

// 7. preceding axis - get price preceding with Amod
const precedingElem: Locator = page.locator("//table[@name='BookTable']//tr[6]/preceding::tr//td[4]");
expect(await precedingElem.count()).toBeLessThan(5000);


//8. following-siblings axis - get all the td of the third <tr>
const followingSbilingsElem: Locator = page.locator("//table[@name='BookTable']//tr[4]/following-sibling::tr[1]/td");
expect(await followingSbilingsElem.allTextContents()).toContain("Mukesh");

//9. preceding-siblings axis - 
const precedingSbilingsElem: Locator = page.locator("//table[@name='BookTable']/ancestor::div[@class='widget-content']/preceding-sibling::h2[text()='Static Web Table']");
console.log(await precedingSbilingsElem.textContent());
});