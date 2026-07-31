import {test,expect,Locator } from '@playwright/test';

/*1. By default Playwright executes the tests in parallel mode.
2. To change the execution mode Navigate to the Plawright config.ts and change-
  fullyParallel: false,
3. To club test under a group-
test.describe('groupname' async() => {
test('1.' ....});
test('2.' ....});
});
4. To execute the specific group use grep command to filter the groups-
> npx playwright test <testfile.spec.ts> --grep Groupname
for e.g - npx playwright test GroupingOfTests.spec.ts --grep Dashboard Testcases

*/
test.describe('Dashboard Testcases', async () => {   // Group Name= Dashboard Testcases 

test('1.Test Verify Dashboard title', async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/index.php");
console.log("Page title:", await page.title());
await expect (page).toHaveTitle("UI Automation Playground — Free Practice Site for Playwright, Selenium & Cypress | QA Automation Labs");

});

test('2.Test Verify Search in Dashboard ', async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/index.php");
const searchboxbox =  page.locator("#toolSearch");
console.log("Search box visible?",await searchboxbox.isVisible());

await expect (searchboxbox).toBeVisible();

});
test('3.Test Count heading in Dashboard ', async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/index.php");
const heading = await page.locator("div.tool-category h4").allInnerTexts();
console.log("Page heading:", heading);
expect (heading.length).toBe(5);

});
}); 




test.describe('Menu Testcases', async () => {   // Group Name= Menu Testcases 

test('4.Test Verify Left Menu ', async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/index.php");
const leftmenu = await page.locator("[data-widget='treeview'] p").count();
expect(leftmenu).toBe(16);
});
});


test.describe('Alert Testcases', async () => {   // Group Name= Alert Testcases 


test('5.Test Verify Alerts', async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/index.php");
await page.locator("i.nav-icon.fas.fa-exclamation-triangle").click();
page.on('dialog',dialog => {
  const alertmsg = dialog.message();
  dialog.accept() 
});
await page.locator('[onclick="showConfirm()"]').click();
console.log(await page.locator('[data-testid="alert-output"]').innerText());

});

test('6.Test Verify Notifications', async ({page}) => {
await page.goto("https://testing.qaautomationlabs.com/index.php");
await page.locator("i.nav-icon.fas.fa-bell").click();
await page.locator('[data-testid="notify-info-btn"]').click();
const toast = page.getByRole('alert');
await expect(toast).toBeVisible();
console.log("Info Notification:", await toast.innerText());
await expect(toast).toContainText('Notification Body:- You Notification Body Goes Here.');
});
});



