import {test,expect,Locator} from "@playwright/test";

test('Keyboard Action',async ({page}) => {
   await page.goto("https://testautomationpractice.blogspot.com/");
   //Approach 1:-
   
    const field1:Locator = page.locator("[name='input1']");
   //field1.fill("Welcome to automation world");
   
   //Approach 2:-
   await page.type('[name="input1"]',"Welcome to automation world");
   
   // Ctrl+A (Selecting all the text)
   await page.keyboard.press('Control+A');

   // Ctrl+C (Copying all the text)
   await page.keyboard.press('Control+C');

   // Tab Key (Pressing Tab Key)
   for(let i =0;i<2;i++)
   { 
   await page.keyboard.down('Tab'); // similar to Keypress
   await page.keyboard.up('Tab'); // similar to Keyrelease
   }

   await page.waitForTimeout(2000);


   // Ctrl+V (Pasting all the text to another box)
   await page.keyboard.press('Control+V');

   
   const field2:Locator = page.locator("[name='input2']");
   await expect(field2).toHaveValue(await field1.inputValue());

});   