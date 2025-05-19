import { AccountData } from '../models/account-data';
import { SignUpProvider } from '../components/signup-provider.component';
import { Role } from '../enums/role';
import { BasePage } from './base-page';

export class SignIn extends BasePage {
  public pagePath = '/login';
  public signUpProvider = new SignUpProvider(this.page);

  private loginForm = this.page.locator('.login-form');
  private emailInput = this.page.getByRole('main').getByPlaceholder('Please Enter Your Email');
  private passwordInput = this.page.getByPlaceholder('Please Enter Your Password');
  private loginButton = this.page.getByRole(Role.BUTTON, { name: 'Login' });
  private createAnAccountLink = this.page.getByRole(Role.BUTTON, {
    name: 'Create An Account',
  });

  async verifyLoginFormIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.loginForm);
  }

  async setAccountData(accountData: AccountData): Promise<void> {
    await this.typeEmail(accountData.email);
    await this.typePassword(accountData.password);
  }

  private async typeEmail(text: string): Promise<void> {
    await this.emailInput.fill(text);
  }

  private async typePassword(text: string): Promise<void> {
    await this.passwordInput.fill(text);
  }

  async clickOnLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
