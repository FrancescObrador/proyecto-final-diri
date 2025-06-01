import { useEffect, useState } from 'react';
import { FirebaseDatabaseService } from '../services/FirebaseDatabaseService';
import Confetti from 'react-confetti-boom';
import { FormattedMessage } from 'react-intl';

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
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start p-6">
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-primary">
          🎉 <FormattedMessage id="admin.congrats" defaultMessage="¡Enhorabuena, Administrador!" />
        </h1>
        <p className="mt-2 text-lg text-base-content">
          <FormattedMessage id="admin.accessSuccess" defaultMessage="Has accedido correctamente al panel de administración." />
        </p>
      </div>

      <div className="w-full max-w-4xl mt-10 card shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl text-primary">
            👥 <FormattedMessage id="admin.userList" defaultMessage="Lista de usuarios" />
          </h2>
          <ul className="divide-y divide-base-300 mt-4">
            {users.map((user, index) => (
              <li key={index} className="py-4">
                <p className="font-semibold text-base-content">
                  <FormattedMessage
                    id="admin.userLabel"
                    defaultMessage="Usuario {index}"
                    values={{ index: index + 1 }}
                  />
                </p>
                <p className="text-sm text-base-content">
                  <FormattedMessage id="admin.userEmail" defaultMessage="Email: {email}" values={{ email: user.email }} />
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {user.roles.map((role: string, idx: number) => (
                    <span
                      key={idx}
                      className="badge badge-secondary badge-outline"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Confetti
        mode="boom"
        x={0.5}
        y={0.5}
        particleCount={200}
        deg={270}
        shapeSize={14}
        spreadDeg={60}
        effectInterval={1000}
        effectCount={1}
        launchSpeed={1.5}
        colors={[
          '#ff577f',
          '#ff884b',
          '#ffd384',
          '#fff9b0',
          '#4dd599',
          '#5f9df7',
          '#9b5de5',
        ]}
        opacityDeltaMultiplier={1.2}
      />
    </div>
  );
};

export default Admin;
