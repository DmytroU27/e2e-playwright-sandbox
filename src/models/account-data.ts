export class AccountData {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;

  constructor(props?: Partial<AccountData>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}
