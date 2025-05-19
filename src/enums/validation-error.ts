export enum ValidationError {
  EMPTY_EMAIL = 'Email is required.',
  EMPTY_FIRST_NAME = 'First Name is required.',
  EMPTY_LAST_NAME = 'Last Name is required.',
  EMPTY_PASSWORD = 'Password is required.',
  INVALID_EMAIL = 'The email format is invalid.',
  INVALID_EMAIL_LOGIN = 'Email format is invalid.',
  SHORT_PASSWORD = 'The password must be at least 6 characters.',
  SHORT_PASSWORD_LOGIN = 'Password must be at least 6 characters.',
}
