
import {Page} from "@playwright/test";
import { RegisterPage } from '../37.PWPageObjectModel/RegisterPage';
import { LoginPage } from '../37.PWPageObjectModel/LoginPage';
import { OverviewPage } from '../37.PWPageObjectModel/OverviewPage';



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