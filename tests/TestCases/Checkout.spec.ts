import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutPageLocators } from "../locators/CheckoutPageLocators";
import { BASEURL, PASSWORD, VALID_USER } from "../utils/config";
import { inputCheckoutData } from "../../test-data/checkoutPageData";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CartPageLocators } from "../locators/CartPageLocators";

test.describe("Checkout Page Validation tests", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    loginPage = new LoginPage(page);
    await page.goto(BASEURL);
    await loginPage.login(VALID_USER, PASSWORD);
    await loginPage.clickLogin();
    await productsPage.addFirstProductToCart();
    await productsPage.clk_cartIcon();
  });

  test("Validate Checkout Page Title and its elements", async ({ page }) => {
    await cartPage.clk_checkoutBtn();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html",
    );
    expect(
      await page.locator(CheckoutPageLocators.checkoutHeader).textContent(),
    ).toBe("Checkout: Your Information");
    expect(
      await page.locator(CheckoutPageLocators.txt_firstName).isVisible(),
    ).toBeTruthy();
    expect(
      await page.locator(CheckoutPageLocators.txt_lastName).isVisible(),
    ).toBeTruthy();
    expect(
      await page.locator(CheckoutPageLocators.txt_postalCode).isVisible(),
    ).toBeTruthy();
    expect(
      await page.locator(CheckoutPageLocators.btn_continue).isVisible(),
    ).toBeTruthy();
    expect(
      await page.locator(CheckoutPageLocators.btn_cancel).isVisible(),
    ).toBeTruthy();
  });

  test("Validate Cancel button functionality in Checkout Page", async ({
    page,
  }) => {
    await cartPage.clk_checkoutBtn();
    await checkoutPage.clk_CancelButton();
    expect(
      await page.locator(CartPageLocators.header_cartPage).textContent(),
    ).toBe("Your Cart");
  });

  test("Validate Continue button without entering user information in Checkout Page", async ({
    page,
  }) => {
    await cartPage.clk_checkoutBtn();
    await checkoutPage.clk_ContinueButton();
    expect(await checkoutPage.getErrorMessage()).toBe(
      "Error: First Name is required",
    );
  });

  test("Validate entering user information in Checkout Page", async ({
    page,
  }) => {
    await cartPage.clk_checkoutBtn();
    await checkoutPage.enterFirstName(inputCheckoutData.firstName);
    await checkoutPage.enterLastName(inputCheckoutData.lastName);
    await checkoutPage.enterPostalCode(inputCheckoutData.postalCode);
    await checkoutPage.clk_ContinueButton();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );
  });
});
