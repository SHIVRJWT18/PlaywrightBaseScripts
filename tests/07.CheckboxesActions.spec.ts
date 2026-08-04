import {test,expect,Locator} from "@playwright/test";

test('Checkbox Action', async ({page}) => {
   await page.goto("https://testautomationpractice.blogspot.com/");

   // Select specific Checkbox = Get Locator by PW Locator
   const sun:Locator = page.getByLabel('Sunday');
   await sun.check();
   await expect(sun).toBeChecked();

   // Select list of Checkboxes
   const days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] // Array
   const chkboxes:Locator[] = days.map(index => page.getByLabel(index));
   expect(chkboxes.length).toBe(7);
   for(const checkbox of chkboxes)
   {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
   }   

   // Unselect last three checkboxes
   for(const chkbx of chkboxes.slice(-3))  // it captures last 3 checkbox
   {
      await chkbx.uncheck();
      await expect(chkbx).not.toBeChecked(); // Assertion for Not to be checked
   }

   // Select few uncheck checkboxes and Unselect few checked checkboxes 
   for(const ckbx of chkboxes)
   {
      if(await ckbx.isChecked()) {
      await ckbx.uncheck();
      await expect(ckbx).not.toBeChecked(); 
    }
    else 
    {
      await ckbx.check();
      await expect (ckbx).toBeChecked();
    }  }

    // Checking Random Checkboxes by selecting indexes
    const index = [2,4,6];
    for(const i of index)
    {
      await chkboxes[i].check();
      await expect(chkboxes[i]).toBeChecked();
    }  

    // Select the checkbox based on level
    const dyname:string="Tuesday";
    for(const label of dyname.toLowerCase())
    {
      if(label==dyname)
       {
         await page.getByLabel(dyname).check();
         await expect(page.getByLabel(dyname)).toBeChecked();
       }   
    }  
   });
