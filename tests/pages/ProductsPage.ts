import { Page } from "@playwright/test";
import { ProductPageLocators } from "../locators/ProductPageLocators";
import { productToAdd } from "../../test-data/productsToAdd";
import { productToRemove } from "../../test-data/productsToRemove";

export class ProductsPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async check_pageHeader() {
    return this.page.textContent(ProductPageLocators.prodPageHeader);
  }

  async total_prodList() {
    return await this.page.locator(ProductPageLocators.lst_prodLsts).count();
  }

  async count_cartIcon() {
    if (
      await this.page.locator(ProductPageLocators.countCartIcon).isVisible()
    ) {
      await this.page.waitForTimeout(1000);
      return await this.page.textContent(ProductPageLocators.countCartIcon);
    } else return null;
  }

  async display_cartIcon() {
    return await this.page.locator(ProductPageLocators.iconCart).isVisible();
  }

  async display_sortDropdown() {
    this.page.locator(ProductPageLocators.slt_Sortdropdown).isVisible();
  }

  async clk_cartIcon() {
    await this.page.click(ProductPageLocators.iconCart);
  }

  async clk_sortDropdown() {
    await this.page.click(ProductPageLocators.slt_Sortdropdown);
  }

  async sort_NameAToZ() {
    await this.page.selectOption(ProductPageLocators.slt_Sortdropdown, "az");
    await this.page.waitForTimeout(1000);
  }

  async sort_NameZToA() {
    await this.page.selectOption(ProductPageLocators.slt_Sortdropdown, "za");
    await this.page.waitForTimeout(1000);
  }

  async sort_PriceLowToHigh() {
    await this.page.selectOption(ProductPageLocators.slt_Sortdropdown, "lohi");
    await this.page.waitForTimeout(1000);
  }

  async sort_PriceHighToLow() {
    await this.page.selectOption(ProductPageLocators.slt_Sortdropdown, "hilo");
    await this.page.waitForTimeout(1000);
  }

  async getProductNames() {
    return await this.page
      .locator(ProductPageLocators.lst_prodNames)
      .allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page
      .locator(ProductPageLocators.lst_prodPrices)
      .allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  async addFirstProductToCart() {
    await this.page
      .locator(ProductPageLocators.lst_btnAddToCart)
      .nth(0)
      .click();
    await this.page.waitForTimeout(1000);
  }

  async removeFirstProductFromCart() {
    if (
      await this.page
        .locator(ProductPageLocators.lst_btnRemoveCard)
        .nth(0)
        .isVisible()
    ) {
      await this.page
        .locator(ProductPageLocators.lst_btnRemoveCard)
        .nth(0)
        .click();
      await this.page.waitForTimeout(3000);
    } else {
      throw new Error("No products in the cart to remove");
    }
  }
  async addAllProductsToCart() {
    const productCount = await this.total_prodList();
    console.log("Total products to add: " + productCount);
    for (let i = 0; i < productCount; i++) {
      await this.page
        .locator(ProductPageLocators.lst_btnAddToCart)
        .nth(i)
        .click();
      await this.page.waitForTimeout(1000);
    }
  }
  async removeAllProductsFromCart() {
    const initialproductCount = await this.total_prodList();
    console.log("Total products to add: " + initialproductCount);
    for (let i = 0; i < initialproductCount; i++) {
      await this.page
        .locator(ProductPageLocators.lst_btnRemoveCard)
        .first()
        .click();
    }
  }

  async addSpecificProductToCart(productToAdd: string[]) {
    const names = await this.page.locator(ProductPageLocators.lst_prodNames);
    const count = await names.count();
    for (let i = 0; i < count; i++) {
      const name = await names.nth(i).textContent();
      if (name && productToAdd.includes(name.trim())) {
        await this.page
          .locator(ProductPageLocators.lst_btnAddToCart)
          .nth(i)
          .click();
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async removeSpecificProductToCart(productToRemove: string[]) {
    for (const productName of productToRemove) {
      await this.page
        .locator(ProductPageLocators.lst_prodLsts)
        .filter({ hasText: productName })
        .locator(ProductPageLocators.lst_btnRemoveCard)
        .click();
    }
  }

  async getFirstProductDetails() {
    const productName = await this.page
      .locator(ProductPageLocators.lst_prodNames)
      .first()
      .textContent();
    const productDescription = await this.page
      .locator(ProductPageLocators.lst_prodDesc)
      .first()
      .textContent();
    const productPrice = await this.page
      .locator(ProductPageLocators.lst_prodPrices)
      .first()
      .textContent();

    return {
      productName: productName.trim(),
      productDescription: productDescription.trim(),
      productPrice: productPrice.trim(),
    };
  }

  async getAllProductDetails() {
    const allProductNames = await this.page
      .locator(ProductPageLocators.lst_prodNames)
      .allTextContents();
    const allProductDescription = await this.page
      .locator(ProductPageLocators.lst_prodDesc)
      .allTextContents();
    const allProductPrice = await this.page
      .locator(ProductPageLocators.lst_prodPrices)
      .allTextContents();

    const allProducts = allProductNames.map((_, i) => ({
      allProductNames: allProductNames[i].trim(),
      allProductDescription: allProductDescription[i].trim(),
      allProductPrice: allProductPrice[i].trim(),
    }));

    return allProducts;
  }

   async getSpecificProductDetails(productToAdd: string[]) {
    const allProductNames = await this.page
      .locator(ProductPageLocators.lst_prodNames)
      .allTextContents();
    const allProductDescription = await this.page
      .locator(ProductPageLocators.lst_prodDesc)
      .allTextContents();
    const allProductPrice = await this.page
      .locator(ProductPageLocators.lst_prodPrices)
      .allTextContents();

    const allProducts = allProductNames.map((_, i) => ({
      allProductNames: allProductNames[i].trim(),
      allProductDescription: allProductDescription[i].trim(),
      allProductPrice: allProductPrice[i].trim(),
    }));

    return allProducts.filter(p=>productToAdd.includes(p.allProductNames))
  }


}
