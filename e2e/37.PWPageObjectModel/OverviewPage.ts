import {Page} from '@playwright/test';
export class OverviewPage {

// Locators
    readonly page: Page;
    readonly logoutLink = "a[href='logout.htm']";
    readonly opennewaccountLink = "a[href='openaccount.htm']";
    readonly accountoverviewLink = "a[href='overview.htm']";
    readonly accountTypeSelect = "select#type.input";
    readonly openaccountbutton = "input[value='Open New Account']";
    readonly getaccountId = "a#newAccountId";
    readonly getaccountIdtable = "table#accountTable tr:nth-child(2) td:nth-child(1) a";
    
    constructor(page: Page) {
    this.page = page;
}  

// Actions
async clickLogoutLink(){
await this.page.locator(this.logoutLink).click();
}

async clickOpenAccountLink(){
await this.page.locator(this.opennewaccountLink).click();
}

async clickOpenAccountButton(){
await this.page.locator(this.openaccountbutton).click();
}

async selectAccountType(accountType: string){
await this.page.locator(this.accountTypeSelect).selectOption(accountType);
}

async clickAccountOverviewLink(){
await this.page.locator(this.accountoverviewLink).click();
}

}    