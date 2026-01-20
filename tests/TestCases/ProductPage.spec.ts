import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { BASEURL, VALID_USER, PASSWORD } from "../utils/config";
import { ProductPageLocators } from "../locators/ProductPageLocators";
import { productToRemove } from "../../test-data/productsToRemove";
import { productToAdd } from "../../test-data/productsToAdd";

test.describe("Product Page functionality", () => {
  let productsPage: ProductsPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    loginPage = new LoginPage(page);

    await page.goto(BASEURL);
    await loginPage.login(VALID_USER, PASSWORD);
    await loginPage.clickLogin();
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("Verify Product Page Header", async ({ page }) => {
    const headerText = await productsPage.check_pageHeader();
    expect(headerText).toBe("Products");
  });

  test("Verify total products on the page", async ({ page }) => {
    const totalProducts: number = await productsPage.total_prodList();
    expect(totalProducts).toBe(6);
    console.log("Total products on Product Page: " + totalProducts);
  });

  test("Verify that products are sorted based on Name (A to Z)", async ({
    page,
  }) => {
    await productsPage.sort_NameAToZ();
    const names = await productsPage.getProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test("Verify that products are sorted based on Name (Z to A)", async ({
    page,
  }) => {
    await productsPage.sort_NameZToA();
    const names = await productsPage.getProductNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });
  test("Verify that products are sorted based on Price (Low to High)", async ({
    page,
  }) => {
    await productsPage.sort_PriceLowToHigh();
    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test("Verify that products are sorted based on Price (High to Low)", async ({
    page,
  }) => {
    await productsPage.sort_PriceHighToLow();
    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test("Add first product to the cart and verify cart count", async ({
    page,
  }) => {
    await productsPage.addFirstProductToCart();
    console.log("First product added to the cart");
    const cartcount = await productsPage.count_cartIcon();
    expect(cartcount).toBe("1");
    console.log("Cart count after adding first product: " + cartcount);
  });

  test("Remove first product from the cart and verify cart count", async ({
    page,
  }) => {
    const initialCartCount = await productsPage.count_cartIcon();
    if (initialCartCount === null) {
      console.log("Cart is initially empty. Adding first product to the cart.");
      await productsPage.addFirstProductToCart();
      console.log("First product added to the cart for removal test.");
    }
    await productsPage.removeFirstProductFromCart();
    console.log("First product removed from the cart");
    const updatedCartCount = await productsPage.count_cartIcon();
    console.log("Cart count after removing first product: " + updatedCartCount);
    expect(updatedCartCount).toBeNull();
  });

  test.only("Add all products to the cart and verify cart count", async ({
    page}) => {
    await productsPage.addAllProductsToCart();
    console.log("All products added to the cart");
    const cartcount = await productsPage.count_cartIcon();
    expect(cartcount).toBe("6");
    console.log("Cart count after adding all products: " + cartcount);
  });

  test("Remove all products from the cart and verify cart count", async ({
    page,
  }) => {
    const initialCartCount = await productsPage.count_cartIcon();
    if (initialCartCount === null) {
      console.log("Cart is initially empty. Adding all products to the cart.");
      await productsPage.addAllProductsToCart();
      console.log("All products added to the cart for removal test.");
    }
    await productsPage.removeAllProductsFromCart();
    const updatedCartCount = await productsPage.count_cartIcon();
    console.log("Cart count after removing all products: " + updatedCartCount);
    expect(updatedCartCount).toBeNull();
  });

  test("Add specific products to the cart and verify cart count", async ({
    page,
  }) => {
    await productsPage.addSpecificProductToCart(productToAdd);
    console.log("Specific products added to the cart");
    const cartcount = await productsPage.count_cartIcon();
    expect(cartcount).toBe(productToAdd.length.toString());
    console.log("Cart count after adding specific products: " + cartcount);
  });

  test("Remove specific products to the cart and verify cart count", async ({
    page,
  }) => {
    const initialCartCount = await productsPage.count_cartIcon();
    if (initialCartCount === null) {
      console.log("Cart is initially empty. Adding all products to the cart.");
      await productsPage.addSpecificProductToCart(productToAdd);
      console.log("Specific products added to the cart");
    }
    const addedCartCount = await productsPage.count_cartIcon();
    console.log(
      "Cart count before removing specific products: " + addedCartCount
    );
    await productsPage.removeSpecificProductToCart(productToRemove);
    console.log("Specific products removed from the cart");
    const updatedCartCount = await productsPage.count_cartIcon();
    console.log(
      "Cart count after removing specific products: " + updatedCartCount
    );
    expect(updatedCartCount).toBe(
      (parseInt(addedCartCount) - productToRemove.length).toString()
    );
  });
});
