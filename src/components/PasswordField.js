import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

export default function PasswordField({ onChange, error, value, sx }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label="Password"
      variant="outlined"
      margin="dense"
      fullWidth
      sx={sx}
      id="password"
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        )
      }}
      error={!!error}
      helperText={error ? error : " "}
    />
  );
}