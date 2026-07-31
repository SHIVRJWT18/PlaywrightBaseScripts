import {test,expect,Locator} from "@playwright/test";

 test('Radio Button Action', async ({page}) => {
   await page.goto("https://testautomationpractice.blogspot.com/");
   const radiobtn:Locator = page.locator('input[value="male"]');
   await expect(radiobtn).toBeVisible();
   await expect(radiobtn).toBeEnabled();
   expect(await radiobtn.isChecked()).toBe(false);
   await radiobtn.check();
   expect(await radiobtn.isChecked()).toBe(true); // comparing boolean values
   await expect(radiobtn).toBeChecked();  // This a assertion method (Most prefer to use)
   });