'use client';
import { useEffect, useState } from 'react';
const dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/checkAuth', {
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        window.location.href = '/';
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard Component</h1>
    </div>
  );
};

export default dashboard;
