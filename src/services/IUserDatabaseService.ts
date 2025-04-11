import { Role, User } from "./IAuthService";

export interface IUserDatabaseService {
    getUserRoles(uid: string): Promise<Role[]>;
    setUserRoles(uid: string, user: User): Promise<Role[]>;
}