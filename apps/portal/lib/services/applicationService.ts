import {
  applicationRepository,
  MentorApplicationData,
  MenteeApplicationData,
} from '../repositories/applicationRepository';

class ApplicationService {
  async submitMentorApplication(data: MentorApplicationData) {
    try {
      // Update user role to mentor
      await applicationRepository.updateProfileRole(data.user_id, 'mentor');
      
      // Create application
      const result = await applicationRepository.createMentorApplication(data);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async submitMenteeApplication(data: MenteeApplicationData) {
    try {
      // Update user role to mentee
      await applicationRepository.updateProfileRole(data.user_id, 'mentee');
      
      // Create application
      const result = await applicationRepository.createMenteeApplication(data);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getMentorApplication(userId: string) {
    try {
      const result = await applicationRepository.getMentorApplication(userId);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getMenteeApplication(userId: string) {
    try {
      const result = await applicationRepository.getMenteeApplication(userId);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const applicationService = new ApplicationService();
