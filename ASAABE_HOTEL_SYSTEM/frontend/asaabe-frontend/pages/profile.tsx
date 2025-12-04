import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Alert
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AccountCircle, Email, Person, AdminPanelSettings } from '@mui/icons-material';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (!token || !userData) {
      router.push('/login?redirect=/profile');
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    router.push('/');
  };

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh', py: 8 }}>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ fontFamily: 'Playfair Display', fontWeight: 600, color: 'primary.main' }}
        >
          My Profile
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccountCircle sx={{ fontSize: 60, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" gutterBottom>
                  {user.first_name} {user.last_name}
                </Typography>
                <Chip 
                  label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                  color={user.role === 'admin' ? 'error' : 'primary'}
                  icon={user.role === 'admin' ? <AdminPanelSettings /> : <Person />}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>{user.email}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>User ID: {user.id}</Typography>
            </Box>
          </CardContent>
        </Card>

        {user.role === 'admin' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Admin Access
            </Typography>
            <Typography>
              You have administrator privileges. You can access the admin dashboard to manage the hotel system.
            </Typography>
            <Button 
              variant="contained" 
              href="http://localhost:8000/admin" 
              target="_blank"
              sx={{ mt: 2 }}
            >
              Open Admin Dashboard
            </Button>
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Account Actions
          </Typography>
          
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleLogout}
            sx={{ mr: 2 }}
          >
            Logout
          </Button>
          
          <Button 
            variant="contained" 
            href="/rooms"
          >
            Browse Rooms
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}