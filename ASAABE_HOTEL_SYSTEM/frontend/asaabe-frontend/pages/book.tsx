import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BookingFlow } from '../src/components/BookingFlow';

export default function Book() {
  const router = useRouter();
  const [preselectedRoomId, setPreselectedRoomId] = useState<number | undefined>();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login?redirect=/book');
      return;
    }

    // Get preselected room from query params
    if (router.query.room) {
      setPreselectedRoomId(parseInt(router.query.room as string));
    }
  }, [router]);

  return (
    <Box sx={{ backgroundColor: '#F6F7F9', minHeight: '100vh' }}>
      
      {/* Header */}
      <Box sx={{ backgroundColor: '#0F1B2D', color: 'white', py: 6 }}>
        <Container>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ fontFamily: 'Playfair Display', fontWeight: 600 }}
          >
            Book Your Stay
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>
            Complete your reservation in just a few simple steps
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <BookingFlow preselectedRoomId={preselectedRoomId} />
      </Container>
    </Box>
  );
}