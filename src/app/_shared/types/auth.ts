export type UserRole = 'user' | 'admin';

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};
