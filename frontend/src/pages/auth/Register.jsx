import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react'; // Added Loader2 for loading state
import { toast } from 'sonner'; // Added toast for notifications
import api from '@/services/api'; // Added api for backend calls

const Register = () => {
  const { register } = useAuth(); // This might become unused if API is used directly
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/register', formData);
      if (response.data.success) {
        toast.success('Account created successfully!', {
           description: 'You can now log in to your dashboard.'
        });
        navigate('/login'); // Navigate to login after successful registration
      } else {
        // If API returns success: false, handle it as an error
        const errorMessage = response.data.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        toast.error('Registration failed', {
          description: errorMessage
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred during registration.';
      setError(errorMessage);
      toast.error('Registration failed', {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-none shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-foreground font-semibold">Create an Account</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Start using SmartStudy AI today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-input border-border focus:border-ring focus:ring-ring text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-input border-border focus:border-ring focus:ring-ring text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-input border-border focus:border-ring focus:ring-ring text-foreground"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
