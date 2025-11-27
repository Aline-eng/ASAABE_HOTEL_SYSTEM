import { PrimaryButton } from "@/src/components/Button"
import { FormInput } from "../src/components/FormInput"
import { Container, Box, Typography } from "@mui/material"
export default function Login() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, bgcolor: 'white', borderRadius:2, boxShadow: 3}}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Login to ASAABE
                </Typography>
                <form>
                    <FormInput label="Email" type="email" required />
                    <FormInput label="Password" type="password" required />
                    <Box mt={2}>
                        <PrimaryButton type="submit" fullWidth>
                            Login
                        </PrimaryButton>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}