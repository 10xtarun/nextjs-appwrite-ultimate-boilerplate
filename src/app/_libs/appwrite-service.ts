/**
 * AppwriteService provides a singleton instance for Appwrite Client and Account.
 *
 * Usage:
 *   const { client, account } = getAppwrite();
 *
 * The instance is initialized on first access, then reused everywhere.
 */
import { Client, Account } from 'appwrite';

export class AppwriteService {
  public readonly client: Client;
  public readonly account: Account;

  private static instance: AppwriteService | null = null;

  private constructor() {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string;
    if (!endpoint || !project) {
      throw new Error('Appwrite endpoint or project ID not set in env');
    }
    this.client = new Client().setEndpoint(endpoint).setProject(project);
    this.account = new Account(this.client);
  }

  /**
   * Returns the singleton instance of AppwriteService.
   */
  public static getInstance(): AppwriteService {
    if (!AppwriteService.instance) {
      AppwriteService.instance = new AppwriteService();
    }
    return AppwriteService.instance;
  }
}

/**
 * Helper function to get Appwrite client and account singleton.
 */
export function getAppwrite(): { client: Client; account: Account } {
  const service = AppwriteService.getInstance();
  return { client: service.client, account: service.account };
}
