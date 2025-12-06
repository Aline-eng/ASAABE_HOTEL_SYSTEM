import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Alert
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RoomCard } from './RoomCard';
import { API_URL } from '../config/api';

const steps = ['Select Room & Dates', 'Guest Details', 'Review & Payment'];

interface Room {
  id: number;
  title: string;
  price: number;
  image?: string;
  image_url?: string;
  tags?: string[];
  capacity?: number;
  bed_type?: string;
  bedType?: string;
}

interface BookingData {
  room: number | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string;
  guestDetails: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>;
}

export const BookingFlow = ({ preselectedRoomId }: { preselectedRoomId?: number }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(preselectedRoomId ? {
    id: preselectedRoomId,
    title: 'Deluxe Sea View',
    price: 120,
    image: '/room1.jpg',
    tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
    capacity: 2,
    bedType: 'Queen'
  } : null);
  
  const [bookingData, setBookingData] = useState<BookingData>({
    room: preselectedRoomId || null,
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    guestDetails: []
  });

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/api/rooms/`);
      if (response.ok) {
        const data = await response.json();
        const roomsArray = Array.isArray(data) ? data : (data.results || []);
        
        if (Array.isArray(roomsArray)) {
          const transformedRooms = roomsArray.map((room: any) => ({
            id: room.id,
            title: room.title,
            price: typeof room.price === 'string' ? parseFloat(room.price) : Number(room.price),
            image: room.image_url || '/room1.jpg',
            tags: room.tags || ['Wi-Fi', 'Air Conditioning', 'TV'],
            capacity: room.capacity,
            bedType: room.bed_type
          }));
          setRooms(transformedRooms);
        }
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      // Fallback rooms
      setRooms([
        {
          id: 1,
          title: 'Deluxe Sea View',
          price: 120,
          image: '/room1.jpg',
          tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
          capacity: 2,
          bedType: 'Queen'
        },
        {
          id: 2,
          title: 'Executive Suite',
          price: 180,
          image: '/room2.jpg',
          tags: ['King Bed', 'Workspace', 'Mini Bar'],
          capacity: 4,
          bedType: 'King'
        }
      ]);
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut)) {
      alert('Please select a room and dates');
      return;
    }
    
    if (activeStep === 1) {
      const guestDetails = Array.from({ length: bookingData.guests }, () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }));
      setBookingData(prev => ({ ...prev, guestDetails }));
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    if (selectedRoom) {
      const price = typeof selectedRoom.price === 'number' ? selectedRoom.price : Number(selectedRoom.price);
      return price * calculateNights();
    }
    return 0;
  };

  const handleCompleteBooking = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login?redirect=/book');
        return;
      }

      const response = await fetch(`${API_URL}/api/bookings/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room: bookingData.room,
          check_in: bookingData.checkIn,
          check_out: bookingData.checkOut,
          guests: bookingData.guests,
          special_requests: bookingData.specialRequests
        }),
      });

      if (response.ok) {
        const booking = await response.json();
        
        // Create payment record
        await fetch(`${API_URL}/api/payments/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            booking: booking.id,
            amount: calculateTotal(),
            payment_method: 'pending'
          }),
        });

        // Redirect to My Bookings page
        router.push('/bookings');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Your Room and Dates
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Check-in Date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Check-out Date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Guests</InputLabel>
                  <Select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, guests: e.target.value as number }))}
                  >
                    {[1, 2, 3, 4].map(num => (
                      <MenuItem key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {selectedRoom && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Selected Room:</Typography>
                <RoomCard {...selectedRoom} image={selectedRoom.image || '/room1.jpg'} />
              </Box>
            )}

            <Grid container spacing={2}>
              {rooms.map((room) => (
                <Grid size={{ xs: 12, md: 6 }} key={room.id}>
                  <Box 
                    onClick={() => {
                      setSelectedRoom(room as any);
                      setBookingData(prev => ({ ...prev, room: room.id as number }));
                    }}
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedRoom?.id === room.id ? 2 : 0,
                      borderColor: 'primary.main',
                      borderRadius: 1
                    }}
                  >
                    <RoomCard {...room} image={room.image || '/room1.jpg'} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Guest Details
            </Typography>
            
            <TextField
              fullWidth
              label="Special Requests"
              multiline
              rows={3}
              value={bookingData.specialRequests}
              onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
              sx={{ mb: 3 }}
            />

            {Array.from({ length: bookingData.guests }, (_, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Guest {index + 1}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={bookingData.guestDetails[index]?.firstName || ''}
                        onChange={(e) => {
                          const newDetails = [...bookingData.guestDetails];
                          if (!newDetails[index]) newDetails[index] = { firstName: '', lastName: '', email: '', phone: '' };
                          newDetails[index].firstName = e.target.value;
                          setBookingData(prev => ({ ...prev, guestDetails: newDetails }));
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={bookingData.guestDetails[index]?.lastName || ''}
                        onChange={(e) => {
                          const newDetails = [...bookingData.guestDetails];
                          if (!newDetails[index]) newDetails[index] = { firstName: '', lastName: '', email: '', phone: '' };
                          newDetails[index].lastName = e.target.value;
                          setBookingData(prev => ({ ...prev, guestDetails: newDetails }));
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Booking
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Booking Summary</Typography>
                <Typography><strong>Room:</strong> {selectedRoom?.title}</Typography>
                <Typography><strong>Check-in:</strong> {bookingData.checkIn}</Typography>
                <Typography><strong>Check-out:</strong> {bookingData.checkOut}</Typography>
                <Typography><strong>Guests:</strong> {bookingData.guests}</Typography>
                <Typography><strong>Nights:</strong> {calculateNights()}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6"><strong>Total:</strong> ${calculateTotal()}</Typography>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        {renderStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length - 1 ? (
          <Button 
            onClick={handleCompleteBooking}
            variant="contained"
            size="large"
          >
            Complete Booking
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};