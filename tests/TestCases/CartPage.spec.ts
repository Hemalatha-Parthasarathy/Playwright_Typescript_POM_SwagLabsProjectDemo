import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { BASEURL, VALID_USER, PASSWORD } from "../utils/config";
import { ProductPageLocators } from "../locators/ProductPageLocators";
import { CartPageLocators } from "../locators/CartPageLocators";
import { productToRemove } from "../../test-data/productsToRemove";
import { productToAdd } from "../../test-data/productsToAdd";

test.describe("Cart Page Test Suite", () => {
  let loginPage : LoginPage;
  let productsPage : ProductsPage;
  let cartPage : CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await page.goto(BASEURL);
    await loginPage.login(VALID_USER, PASSWORD);
    await loginPage.clickLogin();
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("Verify Product Page Header", async ({ page }) => {
    await productsPage.addFirstProductToCart();
    await productsPage.clk_cartIcon();
    expect(await cartPage.check_cartPageTitle()).toBe("Your Cart");
    expect(await cartPage.display_continueShoppingBtn()).toBeTruthy();
    expect(await cartPage.display_checkoutBtn()).toBeTruthy();
    expect(await cartPage.display_labelCartQuantity()).toBeTruthy();
    expect(await cartPage.display_labelCartDescription()).toBeTruthy();
    expect(await cartPage.display_cartIcon()).toBeTruthy();
  });

  test("Validate the Continue shopping functionality", async ({ page }) => {
    await productsPage.addFirstProductToCart();
    await productsPage.clk_cartIcon();
    await cartPage.clk_continueShoppingBtn();
    expect(await productsPage.check_pageHeader()).toBe("Products");
  });

  test("Validate first Single Product in the Cart Page", async ({ page }) => {
    const prodDetails = await productsPage.getFirstProductDetails();
    await productsPage.addFirstProductToCart();
    await productsPage.clk_cartIcon();

    const cartProdDetails = await cartPage.getCartFirstProductDetails();
    expect(cartProdDetails).toEqual(prodDetails);
  });

  test.only("Validate All Product in the Cart Page", async ({ page }) => {
      const prodDetails = await productsPage.getAllProductDetails();
    await productsPage.addAllProductsToCart();
    console.log("All products added to the cart");
    const cartcount = await productsPage.count_cartIcon();
    expect(cartcount).toBe("6");
    console.log("Cart count after adding all products: " + cartcount);
    await productsPage.clk_cartIcon();
    const cartProdDetails = await cartPage.getAllCartProductDetails();
    expect(cartProdDetails).toEqual(prodDetails);
  });

  test("Validate specific Product in the Cart Page", async ({ page }) => {
     const prodDetails = await productsPage.getSpecificProductDetails(productToAdd);
    await productsPage.addSpecificProductToCart(productToAdd);
    await productsPage.clk_cartIcon();

    const cartProdDetails = await cartPage.getSpecificCartProductDetails(productToAdd);
    expect(cartProdDetails).toEqual(prodDetails);
  });

  test("Validate Remove Product functionality in the Cart Page", async ({
    page,
  }) => {
     await productsPage.addAllProductsToCart();
    console.log("All products added to the cart");
       await productsPage.clk_cartIcon();
    const cartcount = await cartPage.count_cartItem();
    expect(cartcount).toBe("6");
    console.log("Cart count before removing products: " + cartcount);

    await cartPage.clk_firstCartItemRemove();
    const cartcountAfterFirstRemove = await cartPage.count_cartItem();
    console.log(
      "Cart count after removing first product: " + cartcountAfterFirstRemove
    );
    expect(cartcountAfterFirstRemove).toBe("5");
         

  });
});
