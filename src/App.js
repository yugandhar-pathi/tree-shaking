import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch('/users');
      res = await res.json();
      setUsers(res.users);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Sample app to demo Tree Shaking Error</h1>
      {!users && <p>Loading...</p>}
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.description}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
