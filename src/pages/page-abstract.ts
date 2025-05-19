import { expect, Locator, Page } from '@playwright/test';
import playwrightConfig from '../../playwright.config';

export abstract class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class CoreActions extends PageHolder {
  private errorMessage = this.page.locator('.invalid-message');

  protected async selectDropdownElement(locator: Locator, text: string): Promise<void> {
    await locator.click();
    await this.page.locator('.dropdown-menu').locator('button').getByText(text).click();
  }

  protected async verifyElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator, `Element "${locator}" is not visible!`).toBeVisible();
  }

  protected async verifyErrorMessages(errors: string[]): Promise<void> {
    for (const error of errors) {
      await expect(this.errorMessage.getByText(error, { exact: true })).toBeVisible();
    }
  }

  protected async verifyText(locator: Locator, text: string): Promise<void> {
    await expect(locator, `No "${text}" in element "${locator}"!`).toHaveText(text);
  }
}

export abstract class PageAbstract extends CoreActions {
  protected abstract pagePath: string;
  protected baseUrl = playwrightConfig.use.baseURL;

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseUrl + this.pagePath);
  }

  async waitForUrl(): Promise<void> {
    await this.page.waitForURL(this.baseUrl + this.pagePath);
  }

  async verifyCurrentUrl(): Promise<void> {
    await this.waitForUrl();
    expect(this.page.url()).toEqual(this.baseUrl + this.pagePath);
  }
}
