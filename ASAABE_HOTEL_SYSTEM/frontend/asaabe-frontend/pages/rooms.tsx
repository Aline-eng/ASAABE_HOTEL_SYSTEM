import { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { RoomCard } from '../src/components/RoomCard'; 

export default function Rooms() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/rooms/')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Available Rooms
      </Typography>

      {/* ✅ Grid container still works, but children syntax changed */}
      <Grid container spacing={4}>
        {rooms.map((room, index) => (
          /* FIX APPLIED HERE:
             1. Removed 'item'
             2. Changed 'xs={12} sm={6} md={4}' to 'size={{ xs: 12, sm: 6, md: 4 }}'
          */
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <RoomCard
              image={room.image}
              title={room.title}
              price={Number(room.price)}
              tags={Array.isArray(room.tags) ? room.tags : []}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}