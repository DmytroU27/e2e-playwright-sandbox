import { PageHolder } from '../pages/page-abstract';
import { AccountData } from '../models/account-data';
import playwrightConfig from '../../playwright.config';

export class RequestApi extends PageHolder {
  private request = this.page.request;
  private baseUrl = playwrightConfig.use.baseURL;
  private registrationEndpoint = '/api/auth/register';
  private loginEndpoint = '/api/auth/login';

  async registerNewAccount(accountData: AccountData): Promise<string> {
    const response = await this.request.fetch(this.baseUrl + this.registrationEndpoint, {
      method: 'post',
      data: {
        email: accountData.email,
        firstName: accountData.firstName,
        isSubscribed: false,
        lastName: accountData.lastName,
        password: accountData.password,
      },
    });
    const responseBody = JSON.parse(await response.text());
    return responseBody.token;
  }

  async loginAccount(accountData: AccountData): Promise<void> {
    await this.request.fetch(this.baseUrl + this.loginEndpoint, {
      method: 'post',
      data: {
        email: accountData.email,
        password: accountData.password,
      },
    });
  }
}
