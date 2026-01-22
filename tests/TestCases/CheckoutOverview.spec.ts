import { test, expect } from "@playwright/test";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { inputCheckoutData } from "../../test-data/checkoutPageData";
import { BASEURL, VALID_USER, PASSWORD } from "../utils/config";
import { productToAdd } from "../../test-data/productsToAdd";
import { CheckoutOverviewLocators } from "../locators/CheckoutOverviewLocators";

test.describe("Checkout Overview Page Test Suite", () => {
  let checkoutOverviewPage: CheckoutOverviewPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let productsPage: ProductsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);

    await page.goto(BASEURL);
    await page.goto(BASEURL);
    await loginPage.login(VALID_USER, PASSWORD);
    await loginPage.clickLogin();
    await productsPage.addSpecificProductToCart(productToAdd);
    await productsPage.clk_cartIcon();
    await cartPage.clk_checkoutBtn();
    await checkoutPage.enterFirstName(inputCheckoutData.firstName);
    await checkoutPage.enterLastName(inputCheckoutData.lastName);
    await checkoutPage.enterPostalCode(inputCheckoutData.postalCode);
    await checkoutPage.clk_ContinueButton();
  });

  test("Validate Checkout Overview Page Header and Amounts", async ({
    page,
  }) => {
    expect(await checkoutOverviewPage.getOverviewHeaderText()).toBe(
      "Checkout: Overview",
    );
    expect(await checkoutOverviewPage.displayItemTotal()).toBe(true);
    expect(await checkoutOverviewPage.displayTaxAmount()).toBe(true);
    expect(await checkoutOverviewPage.displayTotalAmount()).toBe(true);
  });

  test("Validate Finish Button Functionality in Checkout Overview Page", async ({
    page,
  }) => {
    await checkoutOverviewPage.clk_FinishButton();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );
  });

  test("Validate Cancel Button Functionality in Checkout Overview Page", async ({
    page,
  }) => {
    await checkoutOverviewPage.clk_CancelButton();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate Item Total amount calculation in Checkout Overview Page", async ({
    page,
  }) => {
    const productprices =
      await checkoutOverviewPage.getAllOverviewProductDetails();
    const calculatedValue = productprices.reduce(
      (sum, { allProductPrice }) =>
        sum + parseFloat(allProductPrice.replace("$", "")),
      0,
    );
    const itemTotal = await checkoutOverviewPage.getItemTotalText();
    console.log(itemTotal);
    expect(calculatedValue).toBe(itemTotal);
  });

  test("Validate Total Calculations in Checkout Overview Page", async ({
    page,
  }) => {
    const itemTotalText = await checkoutOverviewPage.getItemTotalText();
    console.log(itemTotalText);
    const taxAmountText = await checkoutOverviewPage.getTaxAmountText();
    console.log(taxAmountText);
    const totalAmountText = await checkoutOverviewPage.getTotalAmountText();
    console.log(totalAmountText);
    const sum = Number((itemTotalText + taxAmountText).toFixed(2));

    expect(sum).toEqual(totalAmountText);
  });
});
