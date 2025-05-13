import { PageAbstract } from "./page-abstract";
import { Header } from "../components/header.component";
import { Footer } from "../components/footer.component";
import { Toast } from "../components/toast.component";

export class BasePage extends PageAbstract {
  public pagePath: string

    public header = new Header(this.page);
    public footer = new Footer(this.page);
    public toast = new Toast(this.page);
}

export class HomePage extends BasePage {
  public pagePath = "/";

  private banner = this.page.locator(".homepage");

  async verifyBannerIsVisible(): Promise<void> {
    await this.verifyElementIsVisible(this.banner);
  }
}
