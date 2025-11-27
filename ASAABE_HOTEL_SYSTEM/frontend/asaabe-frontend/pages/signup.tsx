import { PrimaryButton } from "@/src/components/Button";
import { FormInput } from "@/src/components/FormInput";
import { Container, Box, Typography } from "@mui/material";
export default function Signup() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3}}>
                <Typography variant="h4" color="primary" gutterBottom>
                    CREATE an ASAABE Account
                </Typography>
                <form>
                    <FormInput label="Full Name" required />
                    <FormInput label="Email" type="email" required />
                    <FormInput label="Password" type="password" required />
                    <FormInput label="Confirm Password" type="password" />
                    <Box mt={2}>
                        <PrimaryButton type="submit" fullWidth>
                            Sign Up
                        </PrimaryButton>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}