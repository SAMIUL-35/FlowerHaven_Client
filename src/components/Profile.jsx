import React from 'react';
 // Import useAuth from AuthProvider

const Profile = () => {
 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authToken) {
    return <div>Please log in to view this content.</div>;
  }

  return (
    <div>
      <h1>Welcome, </h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
