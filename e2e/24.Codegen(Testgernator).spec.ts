import {test,expect} from '@playwright/test';

/* 1. Playwright provide a feature of test generator or codegen.
2. Test generator/Codegen automatically records test scripts by inspecting elements, assisting 
with debugging, and generating assertions with minimal manual effort.

3. Generate the code automatically by PW:
3.1 Go to Terminal:
> npx playwright codegen <url of application> 
3.2 Manually Copy the script and paste it in VS code through creating a .spec file
*/

// Script generated through code gen:
test('Codegen test', async ({ page }) => {   
  await page.goto('https://the-internet.herokuapp.com/login'); 
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

/*4. Generate the code then automatic copy the script in VS code by creating a .spec file:
4.1 Go to Terminal:
> npx playwright codegen -o <path of test file>   //   Here o represent the output
 for e.g - npx playwright codegen -o e2e/automatecodegentest.spec.ts 
> npx playwright codegen --output e2e/automatecodegentest.spec.ts   

4.2 We can put assertions in the scripts by clicking on tool tips.

5. Record the test for a particular UI by specifying device's name
> npx playwright codegen -o e2e/automatecodegentest.spec.ts --device "<device name>"  
for e.g - npx playwright codegen -o e2e/automatecodegentest.spec.ts --device "iphone 12"

6. Record the test for a particular browser by specifying browser's name
> npx playwright codegen -o e2e/automatecodegentest.spec.ts -b "<browser name>"  
 for e.g - npx playwright codegen -o e2e/automatecodegentest.spec.ts -b "firefox"
> npx playwright codegen --output e2e/automatecodegentest.spec.ts --browser "safari"

7. Record the test for a particular size of browser 
 > npx playwright codegen -o e2e/automatecodegentest.spec.ts --viewport-size "<browser size>"  
 for e.g - npx playwright codegen -o e2e/automatecodegentest.spec.ts --viewport-size "1280,720" 

8. We can use codegen window for debugging operation also.
 > npx playwright automatecodegentest.spec.ts --headed --debug  

9. By default codegen generate the scripts in Javascript/Typescript, We can customize 
    the script language by selecting test runner for specific language such as Java or python 


Note: 
A. If the codegen script  file already exist in the VS code then new script will overide
in test file. 
B. We can also configure viewport size inside playwright.config.ts
   viewport: {width: 1280,height: 720}, 
*/