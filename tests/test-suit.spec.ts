import { test } from '@playwright/test';

import { accountMock } from '../src/data/account-data-mock';
import { AccountData } from '../src/models/account-data';
import { ToastType } from '../src/enums/toast';

import { RequestApi } from '../src/utils/request';
import { BrowserUtils } from '../src/utils/browser-utils';

import { Application } from '../src/pages/application';

test.describe('shop demo @S00ab77c1', () => {
  let accountData: AccountData;

  test.beforeEach(async () => {
    accountData = new AccountData(accountMock);
  });

  test('check home page loaded @T5140a12f', async ({ page }) => {
    const app = new Application(page);
    await app.homePage.navigateTo();
    await app.homePage.verifyCurrentUrl();
    await app.homePage.header.verifyLogoIsVisible();
    await app.homePage.verifyBannerIsVisible();
  });

  test('check registration @T2fc7786b', async ({ page }) => {
    const app = new Application(page);
    await app.homePage.navigateTo();
    await app.homePage.header.clickOnSignUpButton();
    await app.signUpPage.verifySignFormIsVisible();
    await app.signUpPage.signUpProvider.verifySignUpProviderIsVisible();
    await app.signUpPage.setRegistrationData(accountData);
    await app.signUpPage.subscribeToNewsLetter();
    await app.signUpPage.clickOnSignUpButton();
    await app.dashboardPage.toast.verifyContent(
      ToastType.SUCCESS,
      'You have signed up successfully! You will be receiving an email as well. Thank you!',
    );
    await app.dashboardPage.verifyCurrentUrl();
  });

  test('check authorization @T48333231', async ({ page }) => {
    const app = new Application(page);
    await app.homePage.navigateTo();
    await new RequestApi(page).registerNewAccount(accountData);
    await app.homePage.header.clickOnLoginButton();
    await app.signInPage.verifyLoginFormIsVisible();
    await app.signInPage.signUpProvider.verifySignUpProviderIsVisible();
    await app.signInPage.setAccountData(accountData);
    await app.signInPage.clickOnLoginButton();
    await app.dashboardPage.toast.verifyContent(ToastType.SUCCESS, `Hey ${accountData.firstName}, Welcome Back!`);
    await app.dashboardPage.verifyCurrentUrl();
  });

  test('check url @T2490f704', async ({ page }) => {
    const app = new Application(page);
    await app.homePage.navigateTo();
    const token = await new RequestApi(page).registerNewAccount(accountData);
    await new BrowserUtils(page).injectLogin(token);
    await app.dashboardPage.navigateTo();
    await app.dashboardPage.verifyCurrentUrl();
  });
});
