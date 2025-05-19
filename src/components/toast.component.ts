import { ToastType } from '../enums/toast';
import { CoreActions } from '../pages/page-abstract';

export class Toast extends CoreActions {
  private toast = this.page.locator('.notifications-tr');
  private toastError = this.page.locator('.notification-error');
  private toastSuccess = this.page.locator('.notification-success');
  private toastTitle = this.page.locator('.notification-title');
  private toastMessage = this.page.locator('.notification-message');
  private toastCloseIcon = this.page.locator('.notification-dismiss');

  private async verifyErrorToast(): Promise<void> {
    await this.verifyElementIsVisible(this.toastError);
  }

  private async verifySuccessToast(): Promise<void> {
    await this.verifyElementIsVisible(this.toastSuccess);
  }

  private async verifyToastTitle(text: string): Promise<void> {
    await this.verifyText(this.toastTitle, text);
  }

  private async verifyToastMessage(text: string): Promise<void> {
    await this.verifyText(this.toastMessage, text);
  }

  async closeToastMessage(): Promise<void> {
    await this.toastCloseIcon.click();
  }

  private async waitToastToDisappear(): Promise<void> {
    await this.toast.waitFor({ state: 'detached' });
  }

  async verifyContent(toast: ToastType, title: string, message?: string): Promise<void> {
    toast === ToastType.SUCCESS ? await this.verifySuccessToast() : await this.verifyErrorToast();
    await this.verifyToastTitle(title);
    if (message) await this.verifyToastMessage(message);
    await this.waitToastToDisappear();
  }
}
