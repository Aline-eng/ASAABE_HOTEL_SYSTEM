import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import NextLink from 'next/link';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#0F1B2D', color: 'white', mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Hotel Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ fontFamily: 'Playfair Display', fontWeight: 600, color: '#C8A45D' }}
            >
              ASAABE Hotel
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Experience luxury and comfort at Rwanda&apos;s premier hotel destination. 
              Located in the heart of Kibuye with stunning lake views.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#C8A45D' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={NextLink} href="/" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Home
              </Link>
              <Link component={NextLink} href="/rooms" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Rooms
              </Link>
              <Link component={NextLink} href="/bookings" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Bookings
              </Link>
              <Link component={NextLink} href="/login" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Login
              </Link>
              <Link component={NextLink} href="/signup" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Sign Up
              </Link>
            </Box>
          </Grid>

          {/* Contact Us */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#C8A45D' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  NR11, Rubengeraa, Karongi, Kibuye, Rwanda
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +250 788 123 456
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@asaabehotel.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* About Us */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#C8A45D' }}>
              About ASAABE Hotel
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              ASAABE Hotel offers world-class hospitality in the scenic beauty of Kibuye, Rwanda. 
              Our commitment to excellence ensures every guest experiences the perfect blend of 
              luxury, comfort, and authentic Rwandan culture.
            </Typography>
            
            {/* Hotel Location Map */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#C8A45D' }}>
                Our Location
              </Typography>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 150, 
                  backgroundColor: '#1a2332', 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #C8A45D'
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <LocationOn sx={{ fontSize: 40, color: '#C8A45D', mb: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    NR11, Rubengeraa
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Karongi, Kibuye
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    Click to view on Google Maps
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © 2025 ASAABE Hotel. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.6, '&:hover': { opacity: 1 } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.6, '&:hover': { opacity: 1 } }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', opacity: 0.6, '&:hover': { opacity: 1 } }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}