import {Page} from '@playwright/test';
export class RegisterPage {

    // Locators
    readonly page: Page; 
    readonly registerLink = "a[href='register.htm']";
    readonly firstNameInput = "input[id='customer.firstName']";
    readonly lastNameInput = "input[id='customer.lastName']";
    readonly addressInput = "input[id='customer.address.street']";
    readonly cityInput = "input[id='customer.address.city']";
    readonly stateInput = "input[id='customer.address.state']";
    readonly zipcodeInput = "input[id='customer.address.zipCode']";
    readonly phoneInput = "input[id='customer.phoneNumber']";
    readonly SSNInput = "input[id='customer.ssn']";
    readonly userNameInput = "input[id='customer.username']";
    readonly passwordInput = "input[id='customer.password']";
    readonly confirmPasswordInput = "input[id='repeatedPassword']";
    readonly registerButton = "input[value='Register']";
    
    constructor(page: Page) {
    this.page = page;
    }    

    // Actions
    async launchApp(url:string){
    await this.page.goto(url);    
    }

    async enterRegisterUser(
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipcode: number,
    phone: number,
    ssn: number,
    username: string,
    password: string,
    confirmPassword: string
) {
    await this.page.locator(this.firstNameInput).fill(firstName);
    await this.page.locator(this.lastNameInput).fill(lastName);
    await this.page.locator(this.addressInput).fill(address);
    await this.page.locator(this.cityInput).fill(city);
    await this.page.locator(this.stateInput).fill(state);
    await this.page.locator(this.zipcodeInput).fill(zipcode.toString());
    await this.page.locator(this.phoneInput).fill(phone.toString());
    await this.page.locator(this.SSNInput).fill(ssn.toString());
    await this.page.locator(this.userNameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.confirmPasswordInput).fill(confirmPassword);
  }

    async clickRegister() {
    await this.page.locator(this.registerButton).click();
    }




   
}    