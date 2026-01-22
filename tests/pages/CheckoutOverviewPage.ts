import { Page } from "@playwright/test";
import { CheckoutOverviewLocators } from "../locators/CheckoutOverviewLocators";

export class CheckoutOverviewPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async getOverviewHeaderText() {
    return this.page
      .locator(CheckoutOverviewLocators.overviewHeader)
      .textContent();
  }

  async getAllOverviewProductDetails() {
    const allProductNames = await this.page
      .locator(CheckoutOverviewLocators.lst_prodNames)
      .allTextContents();
    const allProductDescription = await this.page
      .locator(CheckoutOverviewLocators.lst_prodDesc)
      .allTextContents();
    const allProductPrice = await this.page
      .locator(CheckoutOverviewLocators.lst_prodPrices)
      .allTextContents();

    const allProducts = allProductNames.map((_, i) => ({
      allProductNames: allProductNames[i].trim(),
      allProductDescription: allProductDescription[i].trim(),
      allProductPrice: allProductPrice[i].trim(),
    }));

    return allProducts;
  }

  async getItemTotalText() {
    const itemTotal = await this.page
      .locator(CheckoutOverviewLocators.lbl_itemtotal)
      .textContent();
    const itemTotalValue = parseFloat(itemTotal.replace("Item total: $", ""));
    return itemTotalValue;
  }

  async getProductsPrices() {
    return await this.page
      .locator(CheckoutOverviewLocators.lst_prodPrices)
      .allTextContents();
  }

  async getTaxAmountText() {
    const taxAmount = await this.page
      .locator(CheckoutOverviewLocators.lbl_taxamount)
      .textContent();
    const taxAmountValue = parseFloat(taxAmount.replace("Tax: $", ""));
    return taxAmountValue;
  }

  async getTotalAmountText() {
    const totalAmount = await this.page
      .locator(CheckoutOverviewLocators.lbl_totalamount)
      .textContent();
    const totalAmountValue = parseFloat(totalAmount.replace("Total: $", ""));
    return totalAmountValue;
  }

  async displayItemTotal() {
    return this.page
      .locator(CheckoutOverviewLocators.lbl_itemtotal)
      .isVisible();
  }

  async displayTaxAmount() {
    return this.page
      .locator(CheckoutOverviewLocators.lbl_taxamount)
      .isVisible();
  }

  async displayTotalAmount() {
    return this.page
      .locator(CheckoutOverviewLocators.lbl_totalamount)
      .isVisible();
  }

  async clk_FinishButton() {
    await this.page.locator(CheckoutOverviewLocators.btn_finish).click();
  }

  async clk_CancelButton() {
    await this.page.locator(CheckoutOverviewLocators.btn_cancel).click();
  }
}
