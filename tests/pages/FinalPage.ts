import { Page } from "@playwright/test";
import { FinalPageLocators } from "../locators/FinalPageLocators";

export class FinalPage {
  constructor(private page: Page) {
    this.page = page;
  }
  async display_header() {
    return this.page.locator(FinalPageLocators.header).isVisible();
  }

  async display_completionHeader() {
    return this.page.locator(FinalPageLocators.completionHeader).isVisible();
  }

  async display_textContent() {
    return this.page.locator(FinalPageLocators.txt_content).isVisible();
  }

  async display_btnBackHome() {
    return this.page.locator(FinalPageLocators.btn_backHome).isVisible();
  }

  async get_headerText() {
    return this.page.locator(FinalPageLocators.header).textContent();
  }

  async get_completionHeaderText() {
    return this.page.locator(FinalPageLocators.completionHeader).textContent();
  }

  async get_contentText() {
    return this.page.locator(FinalPageLocators.txt_content).textContent();
  }

  async clk_btnBackHome() {
    await this.page.locator(FinalPageLocators.btn_backHome).click();
  }
}
