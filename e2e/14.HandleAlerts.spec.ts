import { test,expect, Locator } from "@playwright/test";

/*1. By default, dialogs are auto-dismissed by Playwright, we not need to handle them.
  2. However we can register a dialog handler before the action that triggers the dialog to 
     dialog.accept() or dialog.dismiss() it.*/
test('Simple Alerts Handle with PW',async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const simpalert: Locator = page.locator("[onClick='myFunctionAlert()']");
//simpalert.click(); // Open the Alert, this will auto close by Playwright 

// Enabling alert handling event
page.on('dialog', (dialog) => { // here 'dialog' is a Event Function followed by dialog arrow fun.
    console.log("dialog type:",dialog.type());    // type of alert
    expect(dialog.type()).toContain('alert');
    console.log("dialog message:", dialog.message()); // Alert message from dialog
    expect(dialog.message()).toContain("I am an alert box!");
    dialog.accept();
}); // These stmt should ready before the clicking alert action has performed
await simpalert.click();
});

test('Confirmation Alerts Handle with PW',async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const cnfrmalert: Locator = page.locator("[onClick='myFunctionConfirm()']");

// Register a dailog handler
page.on('dialog', (dialog) => { // here 'dialog' is a Event Function followed by dialog arrow fun.
    console.log("dialog type:",dialog.type());    // type of alert
    expect(dialog.type()).toContain('confirm');
    console.log("dialog message:", dialog.message()); // Alert message from dialog
    expect(dialog.message()).toContain("Press a button!");
   // dialog.accept();
     dialog.dismiss();
}); // These stmt should ready before the clicking alert action has performed

await cnfrmalert.click();
const acttext:string  = await page.locator("#demo").innerText();
console.log(acttext);
expect(acttext).toBe("You pressed Cancel!");
}); 

test('Prompt Alerts Handle with PW',async ({page}) => {
await page.goto("https://testautomationpractice.blogspot.com/");
const prmptalert: Locator = page.locator("[onClick='myFunctionPrompt()']");

// Register a dailog handler
page.on('dialog', (dialog) => { // here 'dialog' is a Event Function followed by dialog arrow fun.
    console.log("dialog type:",dialog.type());    // type of alert
    expect(dialog.type()).toContain('prompt');
    console.log("dialog message:", dialog.message()); // Alert message from dialog
    expect(dialog.message()).toContain("Please enter your name:");
    expect (dialog.defaultValue()).toContain("Harry Potter"); // Verify default value
    dialog.accept("Dharmendra bhadoria");
    // dialog.dismiss();
 }); 

 await prmptalert.click();
 const acttext:string  = await page.locator("#demo").innerText();
 console.log(acttext);
 expect(acttext).toBe("Hello Dharmendra bhadoria! How are you today?");
 }); 