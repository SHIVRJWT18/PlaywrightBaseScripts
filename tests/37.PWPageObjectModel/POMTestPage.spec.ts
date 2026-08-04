import {test, expect} from '@playwright/test';
import { PageManager } from './PageManager';
import { LoginData, Overview, RegisterData } from './TestDataPage';

test('register the app',async ({page}) => {
const pm = new PageManager(page);

await pm.rp.launchApp(RegisterData.registerURL);
console.log("Get Title: ",await page.title());
await expect(page).toHaveURL(RegisterData.registerURL); 

await expect(page).toHaveTitle(RegisterData.appTitle); 
await pm.rp.enterRegisterUser(RegisterData.firstName, RegisterData.lastName, RegisterData.address, RegisterData.city, 
RegisterData.state, RegisterData.zipcode, RegisterData.phone, RegisterData.ssn, RegisterData.username, 
RegisterData.password, RegisterData.confirmPassword);

await pm.rp.clickRegister();
});

test.beforeEach('login the app',async ({page}) => {
const pm = new PageManager(page);
await pm.lp.launchApp(LoginData.loginURL);
await pm.lp.enterUsername(LoginData.userName);
await pm.lp.enterPassword(LoginData.password);
await pm.lp.clickLogIn();
await expect(page).toHaveURL(Overview.overviewURL);
await expect(page).toHaveTitle(Overview.appTitle);

console.log("Get Title: ", await page.title());
await expect(page).toHaveTitle(Overview.appTitle); 
});

test.afterEach('logout the app',async ({page}) => {
const pm = new PageManager(page);
await pm.op.clickLogoutLink();
await expect(page).toHaveURL(LoginData.loginURL); 

console.log("Get Title: ",await page.title());
});

test('Open new Account',async ({page}) => {
const pm = new PageManager(page);
await pm.lp.enterUsername(LoginData.userName);
await pm.lp.enterPassword(LoginData.password);
await pm.lp.clickLogIn();
await pm.op.clickOpenAccountLink();
await expect(page).toHaveURL(Overview.overviewURL); 
await expect(page).toHaveTitle(Overview.appTitle); 
console.log("Get Title: ",await page.title());


await pm.op.selectAccountType("SAVINGS");
await pm.op.clickOpenAccountButton();
await expect(page).toHaveURL(Overview.overviewURL); 
await expect(page).toHaveTitle(Overview.appTitle); 
console.log("Get Title: ",await page.title());


});