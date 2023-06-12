import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../api/auth";
import { setUserKey } from "../utils";
import { Context } from "../App";

const defaultTheme = createTheme();

export default function SignIn() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setmessage] = React.useState("");
  const [user, setUser] = React.useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const secret = data.get("secret");
    const key = data.get("key");
    if (!secret) {
      setmessage("secret");
      setIsOpen(true);
    }
    if (!key) {
      setmessage("secret");
      setIsOpen(true);
    }
    if (key && secret) {
      const res = await signIn({ data: { key, secret } });
      if (res?.data) {
        setUserKey(res?.data);
        setUser(res?.data);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="key"
              label="Key"
              name="key"
              autoComplete="key"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="secret"
              label="Secret"
              type="secret"
              id="secret"
              autoComplete="secret"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                Don't have an account?
                <Link to="/sign-up" variant="body2">
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={isOpen}
          autoHideDuration={6000}
          onClose={() => setIsOpen(false)}
        >
          <MuiAlert
            onClose={() => setIsOpen(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please enter your {message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
