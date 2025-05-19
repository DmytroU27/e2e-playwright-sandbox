import { PageHolder } from '../pages/page-abstract';

export class BrowserUtils extends PageHolder {
  async injectLogin(token: string): Promise<void> {
    await this.page.evaluate((arg) => window.localStorage.setItem('token', arg), token);
  }
}
