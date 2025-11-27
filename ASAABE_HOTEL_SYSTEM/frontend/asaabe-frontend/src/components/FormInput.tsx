import TextField, {  TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  label: string;
};

export const FormInput = ({ label, ...props }: Props) => (
  <TextField
    label={label}
    variant="outlined"
    fullWidth
    margin="normal"
    {...props}
  />
);