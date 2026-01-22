import { authRepository, SignUpData, SignInData } from '../repositories/authRepository';

class AuthService {
  async signUp(data: SignUpData) {
    try {
      const result = await authRepository.signUp(data);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async signIn(data: SignInData) {
    try {
      const result = await authRepository.signIn(data);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async signOut() {
    try {
      await authRepository.signOut();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      await authRepository.resetPassword(email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async updatePassword(newPassword: string) {
    try {
      await authRepository.updatePassword(newPassword);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const authService = new AuthService();
