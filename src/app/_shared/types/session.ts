/**
 * Type for Appwrite session (user).
 */
import type { Models } from 'appwrite';

export type UserSession = Models.User<Models.Preferences> | null;
