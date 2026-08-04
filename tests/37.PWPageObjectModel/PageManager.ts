
import {Page} from "@playwright/test";
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { OverviewPage } from './OverviewPage';



export class PageManager {
readonly page: Page;
readonly rp: RegisterPage;
readonly lp: LoginPage;
readonly op: OverviewPage;

constructor(page: Page) {
this.page =page;
this.rp = new RegisterPage(this.page);
this.lp = new LoginPage(this.page);
this.op = new OverviewPage(this.page);

   }
}