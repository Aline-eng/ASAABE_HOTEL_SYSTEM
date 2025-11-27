import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode
}
export const PrimaryButton = ({ children, ...props }: Props) => (
  <Button variant="contained" color="primary" {...props}>
    {children}
  </Button>
);

export const SecondaryButton = ({ children, ...props }: Props) => (
  <Button variant="outlined" color="secondary" {...props}>
    {children}
  </Button>
);