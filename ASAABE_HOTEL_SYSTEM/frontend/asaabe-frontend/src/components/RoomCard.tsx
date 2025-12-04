import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Rating, 
  Button,
  CardActions,
  IconButton
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  Visibility, 
  Person, 
  Bed,
  SquareFoot
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

type Props = {
  id?: number;
  image: string;
  title: string;
  price: number;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  capacity?: number;
  bedType?: string;
  size?: number;
  roomNumber?: string;
  onFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export const RoomCard = ({ 
  id,
  image, 
  title, 
  price, 
  tags, 
  rating = 0,
  reviewCount = 0,
  capacity = 2,
  bedType = 'Queen',
  size,
  roomNumber,
  onFavorite,
  isFavorite = false
}: Props) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = () => {
    if (id && onFavorite) {
      onFavorite(id);
    }
    setFavorite(!favorite);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia 
          component="img" 
          height="200" 
          image={image} 
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
          }}
          onClick={handleFavorite}
        >
          {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        {roomNumber && (
          <Chip
            label={`Room ${roomNumber}`}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(15, 27, 45, 0.9)',
              color: 'white'
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({reviewCount} reviews)
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person fontSize="small" color="action" />
            <Typography variant="body2">{capacity}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Bed fontSize="small" color="action" />
            <Typography variant="body2">{bedType}</Typography>
          </Box>
          {size && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SquareFoot fontSize="small" color="action" />
              <Typography variant="body2">{size}m²</Typography>
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="h5" 
          color="primary" 
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          ${price}
          <Typography component="span" variant="body2" color="text.secondary">
            / night
          </Typography>
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {tags.slice(0, 3).map((tag, i) => (
            <Chip 
              key={i} 
              label={tag} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
          {tags.length > 3 && (
            <Chip 
              label={`+${tags.length - 3} more`} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          )}
        </Box>
      </CardContent>
      
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<Visibility />}
          component={Link}
          href={id ? `/rooms/${id}` : '#'}
          sx={{ mr: 1 }}
        >
          View Details
        </Button>
        <Button 
          variant="contained" 
          size="small"
          component={Link}
          href={id ? `/book?room=${id}` : '#'}
          sx={{ ml: 'auto' }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};