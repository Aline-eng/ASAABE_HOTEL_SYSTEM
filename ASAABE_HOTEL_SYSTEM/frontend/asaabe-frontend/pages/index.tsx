import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  Card,
  CardContent,
  Avatar,
  Rating
} from '@mui/material';
import {
  Wifi,
  Pool,
  Spa,
  FitnessCenter,
  LocalAirport,
  Restaurant,
  RoomService,
  LocalParking,
  ArrowForward
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RoomCard } from '../src/components/RoomCard';

const amenities = [
  { name: 'Free Wi-Fi', icon: <Wifi />, description: 'High-speed internet throughout the hotel' },
  { name: 'Swimming Pool', icon: <Pool />, description: 'Outdoor infinity pool with city views' },
  { name: 'Spa & Wellness', icon: <Spa />, description: 'Full-service spa and wellness center' },
  { name: 'Fitness Center', icon: <FitnessCenter />, description: '24/7 state-of-the-art gym' },
  { name: 'Airport Pickup', icon: <LocalAirport />, description: 'Complimentary airport transfers' },
  { name: 'Fine Dining', icon: <Restaurant />, description: 'Award-winning restaurants and bars' },
  { name: 'Room Service', icon: <RoomService />, description: '24-hour in-room dining service' },
  { name: 'Valet Parking', icon: <LocalParking />, description: 'Secure valet parking available' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely stunning hotel with exceptional service. The ocean view from our suite was breathtaking!',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    rating: 5,
    comment: 'Perfect location and luxurious amenities. The spa was incredible and the staff went above and beyond.',
    avatar: 'MC'
  },
  {
    name: 'Emma Williams',
    rating: 4,
    comment: 'Beautiful hotel with great facilities. The rooftop pool and restaurant were highlights of our stay.',
    avatar: 'EW'
  }
];

export default function Home() {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFeaturedRooms([
      {
        id: 1,
        image: '/room1.jpg',
        title: 'Deluxe Sea View',
        price: 120,
        tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
        rating: 4.8,
        reviewCount: 124,
        capacity: 2,
        bedType: 'Queen'
      },
      {
        id: 2,
        image: '/room2.jpg',
        title: 'Executive Suite',
        price: 180,
        tags: ['King Bed', 'Workspace', 'Mini Bar'],
        rating: 4.9,
        reviewCount: 89,
        capacity: 4,
        bedType: 'King'
      },
      {
        id: 3,
        image: '/room3.jpg',
        title: 'Standard Room',
        price: 90,
        tags: ['Air Conditioning', 'TV', 'Private Bathroom'],
        rating: 4.6,
        reviewCount: 156,
        capacity: 2,
        bedType: 'Queen'
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(15, 27, 45, 0.7), rgba(15, 27, 45, 0.7)), url("/room1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 15,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              mb: 2
            }}
          >
            Welcome to ASAABE Hotel
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontWeight: 300
            }}
          >
            Experience luxury, comfort, and elegance in every moment of your stay
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              href="/rooms"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: '#C8A45D',
                '&:hover': { backgroundColor: '#B8944D' }
              }}
            >
              Explore Rooms
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              component={Link}
              href="/book"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                borderColor: 'white',
                color: 'white',
                '&:hover': { 
                  borderColor: '#C8A45D',
                  backgroundColor: 'rgba(200, 164, 93, 0.1)'
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Rooms */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            color="primary" 
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', fontWeight: 600 }}
          >
            Featured Rooms
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our most popular accommodations, each designed to provide the ultimate comfort and luxury
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {featuredRooms.map((room, index) => (
            <Grid item xs={12} sm={6} md={4} key={room.id || index}>
              <RoomCard {...room} />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            size="large"
            component={Link}
            href="/rooms"
            endIcon={<ArrowForward />}
          >
            View All Rooms
          </Button>
        </Box>
      </Container>

      {/* Amenities Section */}
      <Box sx={{ backgroundColor: '#0F1B2D', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'white',
                fontFamily: 'Playfair Display',
                fontWeight: 600,
                mb: 2
              }}
            >
              World-Class Amenities
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 600, mx: 'auto' }}>
              Indulge in our comprehensive range of luxury amenities and services
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {amenities.map((amenity, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card 
                  sx={{ 
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <Box sx={{ color: '#C8A45D', mb: 2 }}>
                      {amenity.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {amenity.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {amenity.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            color="primary" 
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', fontWeight: 600 }}
          >
            What Our Guests Say
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Real experiences from our valued guests
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', p: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ backgroundColor: '#C8A45D', py: 6 }}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                fontFamily: 'Playfair Display',
                fontWeight: 600,
                mb: 2
              }}
            >
              Ready for Your Perfect Stay?
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3 }}>
              Book now and experience the finest hospitality
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              href="/book"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: '#0F1B2D',
                '&:hover': { backgroundColor: '#1a2a3d' }
              }}
            >
              Book Your Stay Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#0F1B2D', color: 'white', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ASAABE Hotel - Where Luxury Meets Comfort
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 ASAABE Hotel. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}