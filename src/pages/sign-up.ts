import { AccountData } from "../models/account-data";
import { SignUpProvider } from "../components/signup-provider.component";
import { BasePage } from "./base-page";

export class SignUp extends BasePage {
  public pagePath = "/register";
  public signUpProvider = new SignUpProvider(this.page);

  private signUpForm = this.page.locator(".signup-form");
  private emailInput = this.page
    .getByRole("main")
    .getByPlaceholder("Please Enter Your Email");
  private firstNameInput = this.page.getByPlaceholder(
    "Please Enter Your First Name",
  );
  private lastNameInput = this.page.getByPlaceholder(
    "Please Enter Your Last Name",
  );
  private passwordInput = this.page.getByPlaceholder(
    "Please Enter Your Password",
  );
  private subscribeCheckbox = this.page.locator(".checkbox label");
  private signUpButton = this.page.getByRole("button", { name: "Sign Up" });

  async verifySignFormIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.signUpForm);
  }

  private async typeEmail(text: string): Promise<void> {
    await this.emailInput.fill(text);
  }

  private async typeFirstName(text: string): Promise<void> {
    await this.firstNameInput.fill(text);
  }

  private async typeLastName(text: string): Promise<void> {
    await this.lastNameInput.fill(text);
  }

  private async typePassword(text: string): Promise<void> {
    await this.passwordInput.fill(text);
  }

  async setRegistrationData(accountData: AccountData): Promise<void> {
    await this.typeEmail(accountData.email);
    await this.typeFirstName(accountData.firstName);
    await this.typeLastName(accountData.lastName);
    await this.typePassword(accountData.password);
  }

  async subscribeToNewsLetter(): Promise<void> {
    await this.subscribeCheckbox.check();
  }

  async clickOnSignUpButton(): Promise<void> {
    await this.signUpButton.click();
  }
}
