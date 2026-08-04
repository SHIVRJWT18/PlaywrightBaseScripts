import {Page} from '@playwright/test';
export class LoginPage {

    // Locators
    readonly page: Page;
    readonly usernameInput = "input[name='username']";
    readonly passwordInput = "input[name='password']";
    readonly loginButton = "input[value='Log In']";
    
    constructor(page: Page) {
    this.page = page;
    }    

    // Actions
    async launchApp(url:string){
    await this.page.goto(url);    
    }

    async enterUsername(userName:string) {
    await this.page.locator(this.usernameInput).fill(userName);
    }

    async enterPassword(password:string) {
    await this.page.locator(this.passwordInput).fill(password);
    }

    async clickLogIn() {
    await this.page.locator(this.loginButton).click();
    }




   
}    