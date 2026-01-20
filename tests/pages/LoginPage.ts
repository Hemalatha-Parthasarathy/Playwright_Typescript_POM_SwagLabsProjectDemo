import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginLocators } from "../locators/LoginLocators";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async enterUsername(username: string) {
    await this.page.fill(LoginLocators.txtUsername, username);
  }

  async login(username: string, password: string) {
    await this.page.fill(LoginLocators.txtUsername, username);
    await this.page.fill(LoginLocators.txtPassword, password);
  }

  async enterPassword(password: string) {
    await this.page.fill(LoginLocators.txtPassword, password);
  }

  async clickLogin() {
    await this.page.click(LoginLocators.btnLogin);
  }

  async clickOpenMenu() {
    await this.page.click(LoginLocators.btnOpenMenu);
  }

  async clickLogout() {
    await this.page.click(LoginLocators.lnkLogout);
  }

  async getErrorMessage() {
    const errorMessage = await this.page.textContent(LoginLocators.errorMsg);
    return errorMessage;
  }
}
