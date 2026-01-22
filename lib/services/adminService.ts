import { adminRepository, AdminStats, UserSearchResult } from '../repositories/adminRepository';
import type { UserRole } from '../repositories/authRepository';

class AdminService {
  async getStats() {
    try {
      const result = await adminRepository.getStats();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async searchUserByEmail(email: string) {
    try {
      const result = await adminRepository.searchUserByEmail(email);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async updateUserRole(userId: string, newRole: UserRole) {
    try {
      await adminRepository.updateUserRole(userId, newRole);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getAllUsers() {
    try {
      const result = await adminRepository.getAllUsers();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const adminService = new AdminService();
