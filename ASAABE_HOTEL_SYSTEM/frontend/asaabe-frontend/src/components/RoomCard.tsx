import { Card, CardMedia, CardContent, Typography, Chip } from '@mui/material';
type Props = {
  image: string;
  title: string;
  price: number;
  tags: string[];
}

export const RoomCard = ({ image, title, price, tags }: Props) => (
  <Card>
    <CardMedia component="img" height="180" image={image} alt={title} />
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        ${price} / night
      </Typography>
      <div style={{ marginTop: 8 }}>
        {tags.map((tag, i) => (
          <Chip key={i} label={tag} size="small" style={{ marginRight: 4 }} />
        ))}
      </div>
    </CardContent>
  </Card>
);