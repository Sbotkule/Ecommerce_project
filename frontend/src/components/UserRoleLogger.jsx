import React, { useEffect } from 'react';
import useGetUserRole from '../hooks/useGetUserRole';

const UserRoleLogger = () => {
  const [admin] = useGetUserRole(); // Assuming the hook doesn't require any parameters

  useEffect(() => {
    console.log(`Current user role: ${admin ? 'Admin' : 'Regular user'}`);
  }, [admin]);

  return null; // Since this component doesn't render anything
};

export default UserRoleLogger;
