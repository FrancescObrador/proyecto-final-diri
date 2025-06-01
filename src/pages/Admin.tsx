import { useEffect, useState } from 'react';
import { FirebaseDatabaseService } from '../services/FirebaseDatabaseService';

const firebaseDBService = new FirebaseDatabaseService();

const Admin = () => {
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
                        <pre>User {index + 1}</pre>
                        <pre>Email: {user.email}</pre>
                        <pre>Roles: {user.roles.join(', ')}</pre>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Admin;