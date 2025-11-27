import { Paper, Typography, Divider } from '@mui/material';

interface Props {
  room: string;
  dates: string;
  guests: number;
  total: number;
}

export const BookingSummary = ({ room, dates, guests, total }: Props) => (
  <Paper elevation={3} style={{ padding: 16 }}>
    <Typography variant="h6">Booking Summary</Typography>
    <Divider style={{ margin: '8px 0' }} />
    <Typography>Room: {room}</Typography>
    <Typography>Dates: {dates}</Typography>
    <Typography>Guests: {guests}</Typography>
    <Typography>Total: ${total}</Typography>
  </Paper>
);