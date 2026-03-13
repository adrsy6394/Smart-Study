import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import UsersTable from '@/components/admin/UsersTable';
import AdminRegistrationForm from '@/components/admin/AdminRegistrationForm';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and management.</p>
      </div>

      {/* Stats Cards rendered dynamically */}
      <AdminStatsCards />
      
      {/* Management Region */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UsersTable />
        </div>
        
        <div>
          <AdminRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
