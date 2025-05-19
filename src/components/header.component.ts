import { Locator } from '@playwright/test';
import { Role } from '../enums/role';
import { CoreActions } from '../pages/page-abstract';

export class Header extends CoreActions {
  private headerInfo = this.page.locator('.header-info');
  private shopLink = this.page.getByRole(Role.LINK, { name: 'Shop' });
  private logo = this.page.locator('.logo');
  private searchInput = this.page.getByPlaceholder('Search Products');
  private basketIcon: Locator;
  private brandsDropdown: Locator;
  private welcomeDropdown = this.page.getByRole(Role.LINK, {
    name: 'Welcome!',
  });
  private loginButton = this.page.getByRole(Role.MENU_ITEM, { name: 'Login' });
  private signUpButton = this.page.getByRole(Role.MENU_ITEM, {
    name: 'Sign Up',
  });
  private backToLoginLink = this.page.getByRole(Role.LINK, {
    name: 'Back To Login',
  });

  async clickOnLoginButton(): Promise<void> {
    await this.selectDropdownElement(this.welcomeDropdown, 'Login');
  }

  async clickOnSignUpButton(): Promise<void> {
    await this.selectDropdownElement(this.welcomeDropdown, 'Sign Up');
  }

  async clickOnLogo(): Promise<void> {
    await this.logo.click();
  }

  async verifyLogoIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.logo);
  }
}
