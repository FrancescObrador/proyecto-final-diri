import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from './FireBase';
import { Role, User } from './IAuthService';
import { IUserDatabaseService } from './IUserDatabaseService';

export class FirebaseDatabaseService implements IUserDatabaseService {

    async getUserRoles(uid: string): Promise<Role[]> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);
        const snapshot = await get(rolesRef);

        if (snapshot.exists()) {
            const rolesData = snapshot.val();
            const roles: Role[] = [];
            if (rolesData.admin === true) {
                roles.push(Role.ADMIN);
            }
            // Aquí se pueden agregar otros roles según se requiera.
            if (roles.length === 0) {
                // Si no se ha asignado ningún rol, se asume el rol de usuario.
                roles.push(Role.USER);
            }
            return roles;
        }
        return [Role.USER];
    }

    async setUserRoles(uid: string, user: User): Promise<Role[]> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);

        // Crear objeto con los roles
        const rolesData = {
            email: user.email,
            admin: user.roles.includes(Role.ADMIN)
        };
        await set(rolesRef, rolesData);
        return user.roles;
    }

    async GetAllUsers(): Promise<any[]> {
        const db = getDatabase(app);
        const usersRef = ref(db, 'users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const formattedData = data ? 
            Object.entries(data).map(([id, value]) => ({id, ...(value as any)}) )
            : [];
            return formattedData;
        } 
        return []
    }
}