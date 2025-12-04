import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link as MuiLink
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call - replace with actual API when backend is ready
      if (formData.email === 'admin@asaabe.com' && formData.password === 'admin123') {
        // Store user data in localStorage
        const userData = {
          id: 1,
          email: 'admin@asaabe.com',
          first_name: 'Admin',
          last_name: 'User',
          role: 'admin'
        };
        
        localStorage.setItem('access_token', 'mock_token_123');
        localStorage.setItem('refresh_token', 'mock_refresh_123');
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setSuccess('Login successful! Redirecting...');
        
        // Force page reload to update navbar state
        setTimeout(() => {
          const redirect = router.query.redirect as string;
          window.location.href = redirect || '/';
        }, 1500);
      } else if (formData.email === 'customer@test.com' && formData.password === 'test123') {
        // Customer login
        const userData = {
          id: 2,
          email: 'customer@test.com',
          first_name: 'Test',
          last_name: 'Customer',
          role: 'customer'
        };
        
        localStorage.setItem('access_token', 'mock_token_456');
        localStorage.setItem('refresh_token', 'mock_refresh_456');
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setSuccess('Login successful! Redirecting...');
        
        // Force page reload to update navbar state
        setTimeout(() => {
          const redirect = router.query.redirect as string;
          window.location.href = redirect || '/';
        }, 1500);
      } else {
        setError('Invalid email or password. Try admin@asaabe.com / admin123 or customer@test.com / test123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            textAlign="center"
            sx={{ fontFamily: 'Playfair Display', fontWeight: 600, color: 'primary.main' }}
          >
            Welcome Back
          </Typography>
          
          <Typography variant="body1" textAlign="center" sx={{ mb: 3, color: 'text.secondary' }}>
            Sign in to your ASAABE Hotel account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Box textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <MuiLink component={Link} href="/signup" color="primary">
                  Sign up here
                </MuiLink>
              </Typography>
            </Box>
          </Box>

          {/* Demo Credentials */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Demo Credentials:
            </Typography>
            <Typography variant="body2">
              Admin: admin@asaabe.com / admin123
            </Typography>
            <Typography variant="body2">
              Customer: customer@test.com / test123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}