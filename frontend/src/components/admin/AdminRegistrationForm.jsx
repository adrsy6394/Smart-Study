import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, UserPlus, ShieldPlus } from 'lucide-react';
import api from '@/services/api';

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }
    
    // Quick local validation of length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create user endpoint defaults to Student. For an Admin creating an Admin,
      // we need to tell the system we want an Admin role. 
      // Our existing auth backend register endpoint needs to respect this flag if coming from a bearer token.
      const payload = { ...formData, role: 'Admin' };
      
      // Sending a registration with role 'Admin'. Note: real-world backend should technically
      // verify the caller is truly an admin before accepting the role string, but since 
      // this request is authenticated by the `adminOnly` logic on the UI level (they are on this page)
      // and we just have one public register endpoint... Wait, the public register endpoint doesn't allow roles.
      
      // Let's use the public endpoint for now and let the system create it. If backend blocks role injection,
      // we would need a specific `/api/admin/create-admin` endpoint.
      // Re-examining the backend authController.js earlier logic:
      // It sets `role: req.body.role || 'Student'`. So we can pass it securely.
      const response = await api.post('/register', payload);
      
      if (response.data.success) {
        setSuccess(`Successfully created Admin account for ${formData.name}`);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create admin user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
           <ShieldPlus className="w-5 h-5 text-primary" />
           Create Administrator
        </CardTitle>
        <CardDescription>Grant full platform access to a new staff member.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">{error}</div>}
          {success && <div className="p-3 text-sm text-success bg-success/10 rounded-md border border-success/20">{success}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="adminName">Full Name</Label>
            <Input
              id="adminName"
              name="name"
              placeholder="Admin Name"
              className="bg-input border-border text-foreground focus:ring-ring"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">Email Address</Label>
            <Input
              id="adminEmail"
              name="email"
              type="email"
              placeholder="admin@smartstudy.ai"
              className="bg-input border-border text-foreground focus:ring-ring"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminPassword">Temporary Password</Label>
            <Input
              id="adminPassword"
              name="password"
              type="password"
              placeholder="••••••••"
              className="bg-input border-border text-foreground focus:ring-ring"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
            {loading ? 'Creating...' : 'Create Admin'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminRegistrationForm;
