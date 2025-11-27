import { Typography, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode
}
export const Heading = ({ children }: Props) => (
  <Typography variant="h4" color="primary" gutterBottom>
    {children}
  </Typography>
);

export const Subheading = ({ children }: Props) => (
  <Typography variant="h6" color="secondary">
    {children}
  </Typography>
);