import { Page } from "@playwright/test";
import { CheckoutPageLocators } from "../locators/CheckoutPageLocators";

export class CheckoutPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async enterFirstName(firstName: string) {
    await this.page.fill(CheckoutPageLocators.txt_firstName, firstName);
  }
  async enterLastName(lastName: string) {
    await this.page.fill(CheckoutPageLocators.txt_lastName, lastName);
  }
  async enterPostalCode(postalCode: string) {
    await this.page.fill(CheckoutPageLocators.txt_postalCode, postalCode);
  }
  async clk_ContinueButton() {
    await this.page.click(CheckoutPageLocators.btn_continue);
  }

  async clk_CancelButton() {
    await this.page.click(CheckoutPageLocators.btn_cancel);
  }

  async getErrorMessage() {
    return await this.page
      .locator(CheckoutPageLocators.error_message)
      .textContent();
  }
}
