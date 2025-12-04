import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Hotel,
  BookOnline,
  AccountCircle,
  Logout,
  Dashboard,
  Notifications
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuthState = () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user_data');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_data');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check auth state immediately
    checkAuthState();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthState();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events to check auth state when user returns to tab
    window.addEventListener('focus', checkAuthState);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkAuthState);
    };
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
    router.push('/');
    handleClose();
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, href: '/' },
    { text: 'Rooms', icon: <Hotel />, href: '/rooms' },
    { text: 'My Bookings', icon: <BookOnline />, href: '/bookings', authRequired: true },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">ASAABE Hotel</Typography>
      </Box>
      <List>
        {menuItems.map((item) => {
          if (item.authRequired && !user) return null;
          return (
            <ListItem 
              key={item.text} 
              component={Link} 
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
        <Divider />
        {!user ? (
          <>
            <ListItem component={Link} href="/login" onClick={() => setMobileOpen(false)}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={Link} href="/signup" onClick={() => setMobileOpen(false)}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={Link} href="/profile" onClick={() => setMobileOpen(false)}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            {user.role === 'admin' && (
              <>
                <ListItem component={Link} href="/admin-dashboard" onClick={() => setMobileOpen(false)}>
                  <ListItemIcon><Dashboard /></ListItemIcon>
                  <ListItemText primary="Frontend Dashboard" />
                </ListItem>
                <ListItem component="a" href="http://localhost:8000/admin/" target="_blank" onClick={() => setMobileOpen(false)}>
                  <ListItemIcon><Dashboard /></ListItemIcon>
                  <ListItemText primary="Django Admin" />
                </ListItem>
              </>
            )}
            <ListItem onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#0F1B2D', top: 0, zIndex: 1100 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component={Link} 
            href="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 'bold',
              letterSpacing: 1,
              fontFamily: 'Playfair Display'
            }}
          >
            ASAABE Hotel
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {menuItems.map((item) => {
                if (item.authRequired && !user) return null;
                return (
                  <Button 
                    key={item.text}
                    color="inherit" 
                    component={Link} 
                    href={item.href}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                );
              })}
              
              {!user ? (
                <>
                  <Button color="inherit" component={Link} href="/login">
                    Login
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    component={Link} 
                    href="/signup"
                    sx={{ ml: 1 }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <IconButton 
                    color="inherit"
                    onClick={(e) => setNotificationAnchor(e.currentTarget)}
                  >
                    <Badge badgeContent={3} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                  
                  <Menu
                    anchorEl={notificationAnchor}
                    open={Boolean(notificationAnchor)}
                    onClose={() => setNotificationAnchor(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{ sx: { width: 300, maxHeight: 400 } }}
                  >
                    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                      <Typography variant="h6">Notifications</Typography>
                    </Box>
                    <MenuItem onClick={() => setNotificationAnchor(null)}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          Booking Confirmed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Your reservation for Deluxe Sea View has been confirmed
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={() => setNotificationAnchor(null)}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          Payment Received
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Payment for booking ASB001 has been processed
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={() => setNotificationAnchor(null)}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          Welcome to ASAABE
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Thank you for joining our hotel family
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Menu>
                  
                  <IconButton
                    size="large"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar 
                      sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                    >
                      {user.first_name[0]}{user.last_name[0]}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose} component={Link} href="/profile">
                      <AccountCircle sx={{ mr: 1 }} /> Profile
                    </MenuItem>
                    {user.role === 'admin' && (
                      <>
                        <MenuItem onClick={handleClose} component={Link} href="/admin-dashboard">
                          <Dashboard sx={{ mr: 1 }} /> Frontend Dashboard
                        </MenuItem>
                        <MenuItem onClick={handleClose} component="a" href="http://localhost:8000/admin/" target="_blank">
                          <Dashboard sx={{ mr: 1 }} /> Django Admin
                        </MenuItem>
                      </>
                    )}
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}