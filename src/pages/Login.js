import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import PasswordField from '../components/PasswordField';

import { schema } from '../App';

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [snackbarContent, setSnackbarContent] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const performLogin = async () => {
    const info = {
      name: name,
      password: password
    };

    try {
      const valid = await schema.validate(
        info, { abortEarly: false }
      );
      if (valid) {
        const res = await fetch("http://localhost:4000/login", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)
        });
        const body = await res.json();
        if (res.ok) {
          setSnackbarContent({
            message: "Logged in as " + body.login,
            severity: 'success'
          });
          setShowSnackbar(true);
        } else {
          setSnackbarContent({
            message: body.why,
            severity: 'error'
          });
          setShowSnackbar(true);
        }
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        err.inner.forEach(element => {
          if (element.path === "name") {
            setNameError(element.errors);
          } else {
            setPasswordError(element.errors);
          }
        });
      }
    }
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      disableGutters
      sx={{
        height: { sm: '100vh' },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Helmet>
        <title>Login - Testing ReactJS</title>
      </Helmet>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarContent.severity}
          sx={{ width: '100%' }}
        >
          {snackbarContent.message}
        </Alert>
      </Snackbar>

      <Card
        variant="outlined"
        sx={{
          width: '100%',
          borderStyle: { xs: 'none', sm: 'solid' }
        }}
      >
        <CardContent
          sx={{
            px: 4,
            ":last-child": { py: 6 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" component="h1" mb={1}>
              Login
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              margin="dense"
              fullWidth
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameError(false);
              }}
              error={!!nameError}
              helperText={nameError ? nameError : " "}
            />
            <PasswordField
              sx={{ mb: 4 }}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              error={passwordError}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" component="p">
                Don't have an account? <Link component={RouterLink} to="/sign-up">Sign up</Link>
              </Typography>
              <Button variant="contained" disableElevation onClick={performLogin}>
                Sign in
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}