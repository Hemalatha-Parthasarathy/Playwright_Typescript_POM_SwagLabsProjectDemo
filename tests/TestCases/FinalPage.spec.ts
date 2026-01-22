import { test, expect } from "@playwright/test";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { FinalPage } from "../pages/FinalPage";
import { inputCheckoutData } from "../../test-data/checkoutPageData";
import { BASEURL, VALID_USER, PASSWORD } from "../utils/config";
import { productToAdd } from "../../test-data/productsToAdd";
import { CheckoutOverviewLocators } from "../locators/CheckoutOverviewLocators";
import { FinalPageLocators } from "../locators/FinalPageLocators";

test.describe("Final Page Validation test suite", () => {
  let checkoutOverviewPage: CheckoutOverviewPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let productsPage: ProductsPage;
  let loginPage: LoginPage;
  let finalPage: FinalPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    finalPage = new FinalPage(page);

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
    await checkoutOverviewPage.clk_FinishButton();
  });

  test("Final Page UI Validation", async ({ page }) => {
    expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    expect(await finalPage.display_header()).toBe(true);
    expect(await finalPage.display_completionHeader()).toBe(true);
    expect(await finalPage.display_textContent()).toBe(true);
    expect(await finalPage.display_btnBackHome()).toBe(true);
  });

  test("Final Page Text Validation", async ({ page }) => {
    expect(await finalPage.get_headerText()).toBe("Checkout: Complete!");
    expect(await finalPage.get_completionHeaderText()).toBe(
      "Thank you for your order!",
    );
    expect(await finalPage.get_contentText()).toBe(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );
  });

  test("Back Home button Validation", async ({ page }) => {
    await finalPage.clk_btnBackHome();
    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
