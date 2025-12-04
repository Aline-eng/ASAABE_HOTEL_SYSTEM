import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Dashboard, Hotel, People, Payment, CheckCircle, Cancel } from '@mui/icons-material';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user_data');
      
      if (!token || !userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        router.push('/');
        return;
      }

      setUser(parsedUser);
      fetchData(token);
    };

    checkAuth();
  }, [router]);

  const fetchData = async (token: string) => {
    try {
      // Fetch bookings
      const bookingsResponse = await fetch('http://localhost:8000/api/bookings/admin_bookings/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
      }

      // Fetch payments
      const paymentsResponse = await fetch('http://localhost:8000/api/payments/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        const paymentsArray = Array.isArray(paymentsData) ? paymentsData : (paymentsData.results || []);
        setPayments(paymentsArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedBooking || !newStatus) return;

    try {
      const token = localStorage.getItem('access_token');
      
      // Update booking status
      const response = await fetch(`http://localhost:8000/api/bookings/${selectedBooking.id}/update_status/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update payment status if exists
        const payment = payments.find(p => p.booking === selectedBooking.id);
        if (payment) {
          const paymentStatus = newStatus === 'confirmed' ? 'approved' : 'rejected';
          await fetch(`http://localhost:8000/api/payments/${payment.id}/update_status/`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: paymentStatus,
              admin_notes: adminNotes 
            }),
          });
        }

        // Refresh data
        fetchData(token!);
        setStatusDialog(false);
        setSelectedBooking(null);
        setNewStatus('');
        setAdminNotes('');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ fontFamily: 'Playfair Display', fontWeight: 600, color: 'primary.main' }}
        >
          Admin Dashboard
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Welcome back, {user.first_name}! Manage your hotel operations here.
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Hotel sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h4">{bookings.length}</Typography>
                    <Typography color="text.secondary">Total Bookings</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 2, color: 'success.main' }} />
                  <Box>
                    <Typography variant="h4">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </Typography>
                    <Typography color="text.secondary">Confirmed</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Payment sx={{ mr: 2, color: 'warning.main' }} />
                  <Box>
                    <Typography variant="h4">
                      {bookings.filter(b => b.status === 'pending').length}
                    </Typography>
                    <Typography color="text.secondary">Pending</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cancel sx={{ mr: 2, color: 'error.main' }} />
                  <Box>
                    <Typography variant="h4">
                      {bookings.filter(b => b.status === 'cancelled').length}
                    </Typography>
                    <Typography color="text.secondary">Cancelled</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bookings Table */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Bookings
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>Guest</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Dates</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.booking_reference}</TableCell>
                      <TableCell>{booking.user?.first_name} {booking.user?.last_name}</TableCell>
                      <TableCell>{booking.room_details?.title || 'N/A'}</TableCell>
                      <TableCell>
                        {booking.check_in} to {booking.check_out}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={booking.status.toUpperCase()} 
                          color={getStatusColor(booking.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${booking.total_price}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setStatusDialog(true);
                          }}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Status Update Dialog */}
        <Dialog open={statusDialog} onClose={() => setStatusDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Update Booking Status</DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Booking: {selectedBooking.booking_reference}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Guest: {selectedBooking.user?.first_name} {selectedBooking.user?.last_name}
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>New Status</InputLabel>
                  <Select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="checked_in">Checked In</MenuItem>
                    <MenuItem value="checked_out">Checked Out</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Admin Notes"
                  multiline
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any notes about this status change..."
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStatusDialog(false)}>Cancel</Button>
            <Button onClick={handleStatusUpdate} variant="contained">
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}