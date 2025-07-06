import React from 'react';
import BusinessForm from './BusinessForm';
import BusinessCard from './BusinessCard';
import ErrorAlert from './ErrorAlert';
import { useBusiness } from '../context/BusinessContext';

const Dashboard = () => {
  const { businessData, error } = useBusiness();

  return (
    <>
      {error && <ErrorAlert message={error} />}
      <BusinessForm />
      {businessData && <BusinessCard />}
    </>
  );
};

export default Dashboard;