import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import {
  BASEURL,
  VALID_USER,
  PASSWORD,
  INVALID_USER,
  VISUAL_USER,
  ERROR_USER,
  PERFORMANCEGLITCH_USER,
  PROBLEM_USER,
  LOCKEDOUT_USER,
} from "../utils/config";

test.describe('Login Page test suite',()=>{
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(BASEURL);
  await expect(page).toHaveURL("https://www.saucedemo.com/");

});

test("User Login with valid credentials", async ({ page }) => {
  await loginPage.enterUsername(VALID_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  await expect(page).toHaveTitle("Swag Labs");
  console.log("Login successful");
  await loginPage.clickOpenMenu();
  await loginPage.clickLogout();
});

test("User login with lockedout user", async ({ page }) => {
  await loginPage.enterUsername(LOCKEDOUT_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  const errorMsg_LockedUser =await loginPage.getErrorMessage();
  console.log("Error Message: " + errorMsg_LockedUser);
  expect(errorMsg_LockedUser).toBe(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("User login with problem user", async ({ page }) => {
  await loginPage.enterUsername(PROBLEM_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  await expect(page).toHaveTitle("Swag Labs");
  console.log("Login successful");
  await loginPage.clickOpenMenu();
  await loginPage.clickLogout();
});

test("User login with performance glitch user", async ({ page }) => {
  await loginPage.enterUsername(PERFORMANCEGLITCH_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  await expect(page).toHaveTitle("Swag Labs");
  console.log("Login successful");
  await loginPage.clickOpenMenu();
  await loginPage.clickLogout();
});

test("User login with error user", async ({ page }) => {
  await loginPage.enterUsername(ERROR_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  await expect(page).toHaveTitle("Swag Labs");
  console.log("Login successful");
  await loginPage.clickOpenMenu();
  await loginPage.clickLogout();
});

test("User login with visual user", async ({ page }) => {
  await loginPage.enterUsername(VISUAL_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  await expect(page).toHaveTitle("Swag Labs");
  console.log("Login successful");
  await loginPage.clickOpenMenu();
  await loginPage.clickLogout();
});

test("User login with invalid user", async ({ page }) => {
  await loginPage.enterUsername(INVALID_USER);
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  const errorMsg_LockedUser = await loginPage.getErrorMessage();
  expect(errorMsg_LockedUser).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("login with Empty Username and password", async ({ page }) => {
  await loginPage.enterUsername("");
  await loginPage.enterPassword("");
  await loginPage.clickLogin();
  const errorMsg_LockedUser = await loginPage.getErrorMessage();
  expect(errorMsg_LockedUser).toBe("Epic sadface: Username is required");
});

test("login with Empty Username", async ({ page }) => {
  await loginPage.enterUsername("");
  await loginPage.enterPassword(PASSWORD);
  await loginPage.clickLogin();
  const errorMsg_LockedUser = await loginPage.getErrorMessage();
  expect(errorMsg_LockedUser).toBe("Epic sadface: Username is required");
});

test("login with Empty password", async ({ page }) => {
  await loginPage.enterUsername(VALID_USER);
  await loginPage.enterPassword("");
  await loginPage.clickLogin();
  const errorMsg_LockedUser = await loginPage.getErrorMessage();
  expect(errorMsg_LockedUser).toBe("Epic sadface: Password is required");
});

});
