import { Page } from "@playwright/test";
import { CartPageLocators } from "../locators/CartPageLocators";
import { ProductPageLocators } from "../locators/ProductPageLocators";

export class CartPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async check_cartPageTitle() {
    return await this.page.textContent(CartPageLocators.header_cartPage);
  }

  async count_cartItem() {
    if (await this.page.locator(CartPageLocators.count_cartItem).isVisible()) {
      return await this.page.textContent(CartPageLocators.count_cartItem);
    } else return null;
  }

  async display_cartIcon() {
    return await this.page.locator(CartPageLocators.icon_cart).isVisible();
  }

  async display_continueShoppingBtn() {
    return await this.page
      .locator(CartPageLocators.btn_continueShop)
      .isVisible();
  }

  async display_checkoutBtn() {
    return await this.page.locator(CartPageLocators.btn_checkout).isVisible();
  }

  async clk_continueShoppingBtn() {
    await this.page.click(CartPageLocators.btn_continueShop);
  }
  async clk_checkoutBtn() {
    await this.page.click(CartPageLocators.btn_checkout);
  }

  async display_labelCartQuantity() {
    return await this.page
      .locator(CartPageLocators.lbl_cartQuantity)
      .isVisible();
  }

  async display_labelCartDescription() {
    return await this.page
      .locator(CartPageLocators.lbl_cartDescription)
      .isVisible();
  }


  async get_cartProductName(){
    return await this.page.textContent(CartPageLocators.name_cartProduct);
  }

  async get_cartProductPrice(){
    return await this.page.textContent(CartPageLocators.price_cartProducct);
  } 

  async get_cartProductNames() {
    return await this.page
      .locator(CartPageLocators.name_cartProduct)
      .allTextContents();
  }

    async get_cartProductPrices() { 
    return await this.page
      .locator(CartPageLocators.price_cartProducct)
      .allTextContents();
    }

    async clk_firstCartItemRemove(){
      await this.page.locator(CartPageLocators.lst_cartItemRemoveBtn).first().click();
    }

    async clk_cartSpecificItemRemoveBtn(productsToRemove: string[]){ {
        for (const productName of productsToRemove) {
        await this.page.locator(CartPageLocators.lst_cartItem).filter({hasText: productName}).locator(CartPageLocators.lst_cartItemRemoveBtn).click();

    }}
}
 async getCartFirstProductDetails(){
const productName = await this.page
      .locator(CartPageLocators.name_cartProduct)
      .first()
      .textContent();
    const productDescription = await this.page
      .locator(CartPageLocators.desc_cartProduct)
      .first()
      .textContent();
    const productPrice = await this.page
      .locator(CartPageLocators.price_cartProducct)
      .first()
      .textContent();

    return {
      productName: productName.trim(),
      productDescription: productDescription.trim(),
      productPrice: productPrice.trim(),
    };
 }

  async getAllCartProductDetails() {
     const allProductNames = await this.page
       .locator(CartPageLocators.name_cartProduct)
       .allTextContents();
     const allProductDescription = await this.page
       .locator(CartPageLocators.desc_cartProduct)
       .allTextContents();
     const allProductPrice = await this.page
       .locator(CartPageLocators.price_cartProducct)
       .allTextContents();
 
     const allProducts = allProductNames.map((_, i) => ({
       allProductNames: allProductNames[i].trim(),
       allProductDescription: allProductDescription[i].trim(),
       allProductPrice: allProductPrice[i].trim(),
     }));
 
     return allProducts;
   }

     async getSpecificCartProductDetails(productToAdd: string[]) {
       const allProductNames = await this.page
         .locator(CartPageLocators.name_cartProduct)
         .allTextContents();
       const allProductDescription = await this.page
         .locator(CartPageLocators.desc_cartProduct)
         .allTextContents();
       const allProductPrice = await this.page
         .locator(CartPageLocators.price_cartProducct)
         .allTextContents();
   
       const allProducts = allProductNames.map((_, i) => ({
         allProductNames: allProductNames[i].trim(),
         allProductDescription: allProductDescription[i].trim(),
         allProductPrice: allProductPrice[i].trim(),
       }));
   
       return allProducts.filter(p=>productToAdd.includes(p.allProductNames))
     }
}
