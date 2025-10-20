'use client';

import ChangePasswordForm from '@/components/Forms/ChangePasswordForm/ChangePasswordForm';
import protectedRoute from '@/hooks/protectedRoute';
import React from 'react';

const ConfigPage = () => {
  return <ChangePasswordForm />;
};

export default protectedRoute(ConfigPage);
