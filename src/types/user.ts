export type UserRole = "USER" | "ADMIN";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  timezone?: string;
  roles?: UserRole[];
  createdAt?: string;
  updatedAt?: string;
}
