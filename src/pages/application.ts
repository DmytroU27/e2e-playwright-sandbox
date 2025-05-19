import { PageHolder } from './page-abstract';
import { SignUp } from './sign-up';
import { BasePage, HomePage } from './base-page';
import { SignIn } from './sign-in';
import { Dashboard } from './dashboard';

export class Application extends PageHolder {
  private basePage = new BasePage(this.page);
  public homePage = new HomePage(this.page);
  public signUpPage = new SignUp(this.page);
  public signInPage = new SignIn(this.page);
  public dashboardPage = new Dashboard(this.page);
}
