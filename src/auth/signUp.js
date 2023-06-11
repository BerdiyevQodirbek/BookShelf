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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { signUp } from "../api/auth";
import { setUserKey } from "../utils";
import { Context } from "../App";

const defaultTheme = createTheme();

export default function SignUp() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [user, setUser] = React.useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const key = data.get("key");
    const email = data.get("email");
    const secret = data.get("secret");
    if (!secret) {
      setMessage("secret");
      setIsOpen(true);
    }
    if (!email) {
      setMessage("email");
      setIsOpen(true);
    }
    if (!key) {
      setMessage("key");
      setIsOpen(true);
    }
    if (!name) {
      setMessage("name");
      setIsOpen(true);
    }

    if (name && key && email && secret) {
      const res = await signUp({
        data: {
          name,
          key,
          email,
          secret,
        },
      });
      if (res?.data?.key) {
        setUserKey(res?.data?.key);
        setUser(res?.data?.key);
      }
    }
    // ["secret", "email", "key", "name"].some((item) => {
    //   console.log(data.get(item));
    //   if (data.get(item) == "") {
    //     setMessage("");
    //     setIsOpen(false);
    //   } else {
    //     setMessage(item);
    //     setIsOpen(true);
    //   }
    // });
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="key"
                  label="Key"
                  name="key"
                  autoComplete="key"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="secret"
                  label="Secret"
                  type="secret"
                  id="secret"
                  autoComplete="secret"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?
                <Link to="/sign-in"> Sign in</Link>
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
