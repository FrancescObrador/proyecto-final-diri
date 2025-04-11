import { useEffect, useState } from 'react';
import { FirebaseDatabaseService } from '../services/FirebaseDatabaseService';

const firebaseDBService = new FirebaseDatabaseService();

export const Admin = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await firebaseDBService.GetAllUsers();
            setUsers(fetchedUsers);

        };

        fetchUsers();
    }, []);

    return (
        <>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>

                        {JSON.stringify(user)}

                    </li>
                ))}
            </ul>
        </>
    );
};
