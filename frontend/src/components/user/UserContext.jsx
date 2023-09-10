import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserContext = createContext({ user: null, setUser: () => {} });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    if (!user) {
      axios
        .get(`http://localhost:5555/users/${name}`,)
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [name]); // Змінили залежність на user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
