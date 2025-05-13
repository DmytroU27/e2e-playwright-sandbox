import { Role } from "../enums/role";
import { CoreActions } from "../pages/page-abstract";

export class SignUpProvider extends CoreActions {
  private signUpProvider = this.page.locator(".signup-provider");
  private googleLogin = this.page.getByRole(Role.LINK, {
    name: "Login with Google",
  });
  private facebookLogin = this.page.getByRole(Role.LINK, {
    name: "Login with Facebook",
  });

  async verifySignUpProviderIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.signUpProvider);
    await this.verifyElementIsVisible(this.facebookLogin);
    await this.verifyElementIsVisible(this.googleLogin);
  }
}
