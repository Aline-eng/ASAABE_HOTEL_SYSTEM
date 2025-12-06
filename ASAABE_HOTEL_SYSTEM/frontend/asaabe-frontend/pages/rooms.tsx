import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import {
  ExpandMore,
  Search,
  FilterList,
  Clear
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { RoomCard } from '../src/components/RoomCard';

interface Room {
  id: number;
  title: string;
  price: number;
  image: string;
  capacity: number;
  bed_type: string;
  tags: string[];
  average_rating?: number;
  total_reviews?: number;
  room_number?: string;
  room_type_name?: string;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rooms, searchTerm, priceRange]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/rooms/');
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Handle both paginated and direct array responses
        const roomsArray = Array.isArray(data) ? data : (data.results || []);
        
        if (Array.isArray(roomsArray)) {
          // Transform API data to match component interface
          const transformedRooms = roomsArray.map((room: any) => ({
            id: room.id,
            title: room.title,
            price: parseFloat(room.price),
            image: room.image_url || '/room1.jpg',
            capacity: room.capacity,
            bed_type: room.bed_type,
            tags: room.tags || ['Wi-Fi', 'Air Conditioning', 'TV'],
            average_rating: 4.5 + Math.random() * 0.5, // Mock rating
            total_reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews
            room_number: `${Math.floor(Math.random() * 300) + 100}`,
            room_type_name: room.title.split(' ')[0]
          }));
          setRooms(transformedRooms);
        } else {
          console.error('Expected array but got:', typeof roomsArray, roomsArray);
          // Fallback to mock data if API fails
          setRooms([
            {
              id: 1,
              title: 'Deluxe Sea View',
              price: 120,
              image: '/room1.jpg',
              capacity: 2,
              bed_type: 'Queen',
              tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
              average_rating: 4.8,
              total_reviews: 124,
              room_number: '101',
              room_type_name: 'Deluxe'
            },
            {
              id: 2,
              title: 'Executive Suite',
              price: 180,
              image: '/room2.jpg',
              capacity: 4,
              bed_type: 'King',
              tags: ['King Bed', 'Workspace', 'Mini Bar'],
              average_rating: 4.9,
              total_reviews: 89,
              room_number: '201',
              room_type_name: 'Suite'
            },
            {
              id: 3,
              title: 'Standard Room',
              price: 90,
              image: '/room3.jpg',
              capacity: 2,
              bed_type: 'Queen',
              tags: ['Air Conditioning', 'TV', 'Private Bathroom'],
              average_rating: 4.6,
              total_reviews: 156,
              room_number: '102',
              room_type_name: 'Standard'
            }
          ]);
        }
      } else {
        console.error('API request failed:', response.status);
        // Use fallback data
        setRooms([
          {
            id: 1,
            title: 'Deluxe Sea View',
            price: 120,
            image: '/room1.jpg',
            capacity: 2,
            bed_type: 'Queen',
            tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
            average_rating: 4.8,
            total_reviews: 124,
            room_number: '101',
            room_type_name: 'Deluxe'
          },
          {
            id: 2,
            title: 'Executive Suite',
            price: 180,
            image: '/room2.jpg',
            capacity: 4,
            bed_type: 'King',
            tags: ['King Bed', 'Workspace', 'Mini Bar'],
            average_rating: 4.9,
            total_reviews: 89,
            room_number: '201',
            room_type_name: 'Suite'
          },
          {
            id: 3,
            title: 'Standard Room',
            price: 90,
            image: '/room3.jpg',
            capacity: 2,
            bed_type: 'Queen',
            tags: ['Air Conditioning', 'TV', 'Private Bathroom'],
            average_rating: 4.6,
            total_reviews: 156,
            room_number: '102',
            room_type_name: 'Standard'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      // Use fallback data on network error
      setRooms([
        {
          id: 1,
          title: 'Deluxe Sea View',
          price: 120,
          image: '/room1.jpg',
          capacity: 2,
          bed_type: 'Queen',
          tags: ['Balcony', 'Wi-Fi', 'Breakfast'],
          average_rating: 4.8,
          total_reviews: 124,
          room_number: '101',
          room_type_name: 'Deluxe'
        },
        {
          id: 2,
          title: 'Executive Suite',
          price: 180,
          image: '/room2.jpg',
          capacity: 4,
          bed_type: 'King',
          tags: ['King Bed', 'Workspace', 'Mini Bar'],
          average_rating: 4.9,
          total_reviews: 89,
          room_number: '201',
          room_type_name: 'Suite'
        },
        {
          id: 3,
          title: 'Standard Room',
          price: 90,
          image: '/room3.jpg',
          capacity: 2,
          bed_type: 'Queen',
          tags: ['Air Conditioning', 'TV', 'Private Bathroom'],
          average_rating: 4.6,
          total_reviews: 156,
          room_number: '102',
          room_type_name: 'Standard'
        }
      ]);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...rooms];

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.room_type_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(room =>
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    setFilteredRooms(filtered);
  };

  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh' }}>
      
      <Box sx={{ backgroundColor: '#0F1B2D', color: 'white', py: 6 }}>
        <Container>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', fontWeight: 600 }}
          >
            Our Rooms & Suites
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>
            Discover the perfect accommodation for your stay
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              
              <TextField
                fullWidth
                label="Search rooms"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={priceRange}
                onChange={(_, value) => setPriceRange(value as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">${priceRange[0]}</Typography>
                <Typography variant="body2">${priceRange[1]}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  {filteredRooms.length} rooms found
                </Typography>
                
                <Grid container spacing={3}>
                  {filteredRooms.map((room) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={room.id}>
                      <RoomCard
                        id={room.id}
                        image={room.image}
                        title={room.title}
                        price={room.price}
                        tags={room.tags}
                        rating={room.average_rating}
                        reviewCount={room.total_reviews}
                        capacity={room.capacity}
                        bedType={room.bed_type}
                        roomNumber={room.room_number}
                      />
                    </Grid>
                  ))}
                </Grid>

                {filteredRooms.length === 0 && !loading && (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No rooms found matching your criteria
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}