import { Box, Container, Typography, Grid } from '@mui/material';
// Note: Ensure these components exist in your project structure
import { RoomCard } from '../src/components/RoomCard';
import { PrimaryButton } from '../src/components/Button';
import { Heading, Subheading } from '../src/components/Typography';

const featuredRooms = [
  {
    image: '/room1.jpg',
    title: 'Deluxe Sea View',
    price: 120,
    tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
  },
  {
    image: '/room2.jpg',
    title: 'Executive Suite',
    price: 180,
    tags: ['King Bed', 'Workspace', 'Mini Bar'],
  },
  {
    image: '/room3.jpg',
    title: 'Standard Room',
    price: 90,
    tags: ['Air Conditioning', 'TV', 'Private Bathroom'],
  },
];

export default function Home() {
  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#0F1B2D',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Heading>Welcome to ASAABE Hotel</Heading>
          <Subheading>Luxury, comfort, and elegance in every stay</Subheading>
          <Box mt={4}>
            <PrimaryButton>Book Your Stay</PrimaryButton>
          </Box>
        </Container>
      </Box>

      {/* Featured Rooms */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Featured Rooms
        </Typography>
        <Grid container spacing={4}>
          {featuredRooms.map((room, index) => (
            // FIX: Removed 'item', changed sizing to 'size={{...}}'
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <RoomCard {...room} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Amenities Section */}
      <Box sx={{ backgroundColor: '#E3E6EA', py: 6 }}>
        <Container>
          <Typography variant="h5" color="primary" gutterBottom>
            Amenities
          </Typography>
          <Grid container spacing={2}>
            {['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Gym', 'Airport Pickup'].map((amenity, i) => (
              // FIX: Removed 'item', changed sizing to 'size={{...}}'
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
                <Typography>{amenity}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#0F1B2D', color: 'white', py: 4, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 ASAABE Hotel. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}