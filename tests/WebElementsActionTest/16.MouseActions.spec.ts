import {test,expect,Locator} from "@playwright/test";

test('Mouse Hover Action',async ({page}) => {
   await page.goto("https://testautomationpractice.blogspot.com/");
   const pointme:Locator = page.locator("//button[normalize-space()='Point Me']");
   const laptops:Locator = page.locator("//a[normalize-space()='Laptops']");

   await pointme.hover();
   await laptops.hover();
   await page.waitForTimeout(4000);

});

test('Mouse RightClick Action',async ({page}) => {
   await page.goto("https://vinothqaacademy.com/mouse-event/");
   const rgtclkme:Locator = page.locator("//button[normalize-space()='Right Click Me']");

   // Right Click Action
   await rgtclkme.click({button:'right'});
   await page.waitForTimeout(4000);

});

test('Mouse DoubleClick Action',async ({page}) => {
   await page.goto("https://vinothqaacademy.com/mouse-event/");
   const dblclkme:Locator = page.locator("//button[normalize-space()='Double Click Me']");

   // Double Click Action
   await dblclkme.dblclick();
   await page.waitForTimeout(4000);
   const status:Locator = page.locator("#doubleStatus");
   console.log("dbl Status:", await status.innerText());
   await expect(status).toBeVisible();
});

test('Mouse Drag&Drop Action',async ({page}) => {
   await page.goto("https://vinothqaacademy.com/mouse-event/");
   const dragme:Locator = page.locator("#dragItem");
   const dropZone:Locator = page.locator("#dropZone");

   //Approach 1: Drag n Drop Action 

   await dragme.hover();   // Drag
   await page.mouse.down();
   
   await dropZone.hover();  // Drop
   await page.mouse.up();

   const status:Locator = page.locator("#dragStatus");
   console.log("dropping Status:", await status.innerText());
   await expect(status).toContainText("Dropped Successfully");
 
  await page.waitForTimeout(4000);

  const resetme = await page.locator("#resetBtn").click();
  console.log("Reset Status:", await status.innerText());
   //Approach 2: Drag n Drop Action 

   await dragme.dragTo(dropZone);
   console.log("dropping Status:", await status.innerText());
   await expect(status).toContainText("Dropped Successfully");
});