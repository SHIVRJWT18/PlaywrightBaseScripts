import {test, expect} from '@playwright/test';
import { PageManager } from './PageManager';
import { LoginData, OpenNewAccount, Overview, RegisterData, AccountOverview } from './constantsPage';
import fs from 'fs';


test('register the app',async ({page}) => {
const pm = new PageManager(page);

await pm.rp.launchApp(RegisterData.registerURL);
console.log("Get Title: ",await page.title());
await expect(page).toHaveURL(RegisterData.registerURL); 

await expect(page).toHaveTitle(RegisterData.appTitle); 
await pm.rp.enterRegisterUser(RegisterData.firstName, RegisterData.lastName, RegisterData.address, RegisterData.city, 
RegisterData.state, RegisterData.zipcode, RegisterData.phone, RegisterData.ssn, RegisterData.username, 
RegisterData.password, RegisterData.confirmPassword);

// Save credentials for next test
  fs.writeFileSync(
    'tests/37.PWPageObjectModel/TestUsers.json', 
    JSON.stringify(RegisterData, null, 2) 
  );

  console.log('Registered Username:', RegisterData.username);
  console.log('Registered Password:', RegisterData.password);

await pm.rp.clickRegister();
});

test('login-logout the app',async ({page}) => {
  const user = JSON.parse(
    fs.readFileSync('tests/37.PWPageObjectModel/TestUsers.json', 'utf-8')
  );

const pm = new PageManager(page);
await pm.lp.launchApp(LoginData.loginURL);
await pm.lp.enterUsername(RegisterData.username);
await pm.lp.enterPassword(RegisterData.password);
await pm.lp.clickLogIn();
await expect(page).toHaveURL(Overview.overviewURL);
await expect(page).toHaveTitle(Overview.appTitle);

console.log("Get title after login: ", await page.title());
await pm.op.clickLogoutLink();
await expect(page).toHaveTitle(LoginData.appTitle); 

await expect(page).toHaveURL(LoginData.loginURL); 

console.log("Get title after logout: ",await page.title());

});

test('Open new Account',async ({page}) => {
  const user = JSON.parse(
    fs.readFileSync('tests/37.PWPageObjectModel/TestUsers.json', 'utf-8')
  );

const pm = new PageManager(page);
await pm.lp.launchApp(LoginData.loginURL);
await pm.lp.enterUsername(RegisterData.username);
await pm.lp.enterPassword(RegisterData.password);
await pm.lp.clickLogIn();
await pm.op.clickOpenAccountLink();
await expect(page).toHaveURL(OpenNewAccount.openAccountURL); 
await expect(page).toHaveTitle(OpenNewAccount.appTitle); 
console.log("Get Title of Open New Account page: ",await page.title());


await pm.op.selectAccountType("SAVINGS");
await pm.op.clickOpenAccountButton();
await pm.op.clickAccountOverviewLink();
await expect(page).toHaveURL(AccountOverview.accountOverviewURL); 
await expect(page).toHaveTitle(AccountOverview.appTitle); 
console.log("Get Title of Account Overview page: ",await page.title());


});