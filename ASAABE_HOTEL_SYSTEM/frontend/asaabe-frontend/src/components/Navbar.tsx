import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontFamily: 'Playfair Display' }}>
          ASAABE
        </Typography>

        {/* Links */}
        <Box>
          <Button color="inherit" component={Link} href="/">Home</Button>
          <Button color="inherit" component={Link} href="/rooms">Rooms</Button>
          <Button color="inherit" component={Link} href="/login">Login</Button>
          <Button color="inherit" component={Link} href="/signup">Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}