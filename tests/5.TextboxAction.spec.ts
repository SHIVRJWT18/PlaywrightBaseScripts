import {test,expect,Locator} from "@playwright/test";

test('Text-Box Action',async ({page}) => {
   await page.goto("https://testautomationpractice.blogspot.com/");
   const textbox:Locator = page.locator('[placeholder="Enter Name"]');
   await expect(textbox).toBeVisible();
   await expect(textbox).toBeEnabled();

   const maxlength: string | null = await textbox.getAttribute("maxlength"); // Get the attribute Value
   expect(maxlength).toBe('15'); 
   // Approach 1
   await textbox.fill("Akshay Verma");
   console.log("Text Value:", await textbox.inputValue());
   await expect(textbox).toHaveValue("Akshay Verma");
   await textbox.clear();
 
   // Approach 2
   await page.type("[id='name']", "Sonu Bhadoria");
   console.log("Text Value:", await textbox.inputValue());
   await expect(textbox).toHaveValue("Sonu Bhadoria");
   });

  
   
   