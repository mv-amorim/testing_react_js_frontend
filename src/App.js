import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as yup from 'yup';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        }
      },
    },
  }
});

export const schema = yup.object().shape({
  name: yup.string().required("Enter a name"),
  password: yup.string().required("Enter a password")
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </ThemeProvider>
  );
}