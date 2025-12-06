import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CalendarToday, Person, Hotel, Payment } from '@mui/icons-material';

export default function Bookings() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user_data');
      
      if (!token || !userData) {
        router.push('/login?redirect=/bookings');
        return;
      }

      setUser(JSON.parse(userData));
      
      try {
        // Fetch bookings
        const bookingsResponse = await fetch('http://localhost:8000/api/bookings/my_bookings/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json();
          
          // Fetch payments for each booking
          const paymentsResponse = await fetch('http://localhost:8000/api/payments/', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (paymentsResponse.ok) {
            const paymentsData = await paymentsResponse.json();
            const paymentsArray = Array.isArray(paymentsData) ? paymentsData : (paymentsData.results || []);
            
            // Attach payment info to bookings
            const bookingsWithPayments = bookingsData.map((booking: any) => ({
              ...booking,
              payment: paymentsArray.find((p: any) => p.booking === booking.id)
            }));
            
            setBookings(bookingsWithPayments);
          } else {
            setBookings(bookingsData);
          }
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
      
      setLoading(false);
    };

    fetchBookings();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
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
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ fontFamily: 'Playfair Display', fontWeight: 600, color: 'primary.main' }}
        >
          My Bookings
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Welcome back, {user.first_name}! Here are your hotel reservations.
        </Typography>

        {bookings.length === 0 ? (
          <Alert severity="info">
            <Typography variant="h6" gutterBottom>
              No bookings found
            </Typography>
            <Typography>
              You haven't made any reservations yet. Start by exploring our rooms!
            </Typography>
            <Button 
              variant="contained" 
              href="/rooms" 
              sx={{ mt: 2 }}
            >
              Browse Rooms
            </Button>
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {bookings.map((booking) => (
              <Grid size={{ xs: 12, md: 6 }} key={booking.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {booking.room_details?.title || booking.room}
                      </Typography>
                      <Chip 
                        label={booking.status.toUpperCase()} 
                        color={getStatusColor(booking.status) as any}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {booking.check_in} to {booking.check_out}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Person sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Hotel sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Booking Reference: {booking.booking_reference}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Payment sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" fontWeight="bold">
                        Total: ${booking.total_price}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Payment Status: 
                      </Typography>
                      <Chip 
                        label={booking.payment?.status?.toUpperCase() || 'PENDING'} 
                        color={getStatusColor(booking.payment?.status || 'pending') as any}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small">
                        View Details
                      </Button>
                      {booking.status === 'pending' && (
                        <Button variant="contained" size="small" disabled>
                          Awaiting Approval
                        </Button>
                      )}
                      {booking.status === 'confirmed' && booking.payment?.status === 'approved' && (
                        <Chip label="APPROVED" color="success" size="small" />
                      )}
                      {booking.status === 'cancelled' && (
                        <Chip label="DENIED" color="error" size="small" />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            href="/rooms"
            sx={{ mr: 2 }}
          >
            Book Another Room
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            href="/profile"
          >
            View Profile
          </Button>
        </Box>
      </Container>
    </Box>
  );
}