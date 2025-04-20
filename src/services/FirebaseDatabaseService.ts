import { getDatabase, ref, get, set, remove, update, onValue } from 'firebase/database';
import { app } from './FireBase';
import { Role, User } from './IAuthService';
import { IUserDatabaseService } from './IUserDatabaseService';
import { MediaData } from '../interfaces/Media';

export class FirebaseDatabaseService implements IUserDatabaseService {
    private db = getDatabase(app);

    // Métodos para usuarios (sin cambios)
    async getUserRoles(uid: string): Promise<Role[]> {
        const rolesRef = ref(this.db, `users/${uid}/roles`);
        const snapshot = await get(rolesRef);

        if (snapshot.exists()) {
            const rolesData = snapshot.val();
            const roles: Role[] = [];
            if (rolesData.admin === true) {
                roles.push(Role.ADMIN);
            }
            if (roles.length === 0) {
                roles.push(Role.USER);
            }
            return roles;
        }
        return [Role.USER];
    }

    async setUserRoles(uid: string, user: User): Promise<Role[]> {
        const rolesRef = ref(this.db, `users/${uid}/roles`);
        const rolesData = {
            email: user.email,
            admin: user.roles.includes(Role.ADMIN)
        };
        await set(rolesRef, rolesData);
        return user.roles;
    }

    async GetAllUsers(): Promise<User[]> {
        const usersRef = ref(this.db, 'users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.entries(data).map(([id, value]) => ({
                uid: id,
                email: (value as any)?.roles?.email || '',
                roles: [(value as any)?.roles?.admin ? Role.ADMIN : Role.USER]
            }));
        }
        return [];
    }

    async AddMedia(uid: string, mediaData: MediaData): Promise<void> {
        const mediaRef = ref(this.db, `users/${uid}/media/${mediaData.id}`);
        await set(mediaRef, {
            seen: mediaData.seen,
            seenAt: mediaData.seenAt,
            addedAt: mediaData.addedAt,
            platform: mediaData.platform,
            media_type: mediaData.media_type,
        });
    }

    async UpdateMedia(uid: string, mediaData: MediaData): Promise<void> {
        const mediaRef = ref(this.db, `users/${uid}/media/${mediaData.id}`);
        await update(mediaRef, {
            seen: mediaData.seen,
            seenAt: mediaData.seenAt,
            platform: mediaData.platform 
        });
    }

    async GetAllMedia(uid: string): Promise<MediaData[]> {
        const mediaRef = ref(this.db, `users/${uid}/media`);
        
        return new Promise((resolve) => {
            onValue(mediaRef, (snapshot) => {
                const data = snapshot.val();
                const mediaDataArray: MediaData[] = [];
                
                if (data) {
                    for (const mediaId of Object.keys(data)) {
                        const mediaData = data[mediaId];
                        mediaDataArray.push({
                            id: Number(mediaId),
                            seen: mediaData.seen,
                            seenAt: mediaData.seenAt,
                            addedAt: mediaData.addedAt,
                            platform: mediaData.platform || "Otros",
                            media_type: mediaData.media_type
                        });
                    }
                }
                resolve(mediaDataArray);
            });
        });
    }

    async RemoveMedia(uid: string, mediaId: number): Promise<void> {
        const mediaRef = ref(this.db, `users/${uid}/media/${mediaId}`);
        await remove(mediaRef);
    }
}

export const firebaseDatabaseService = new FirebaseDatabaseService();