import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function NotFound() {
  return (
    <Container
      component="div"
      maxWidth="xs"
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Helmet>
        <title>Page not found - Testing ReactJS</title>
      </Helmet>
      <Typography variant="h4" component="h1" mb={1}>
        Page not found
      </Typography>
      <Typography variant="body1" component="p" mb={4}>
        The page you're looking for cannot be found.
      </Typography>
      <Button component={RouterLink} to="/" variant="outlined">
        Go to login page
      </Button>
    </Container>
  )
}