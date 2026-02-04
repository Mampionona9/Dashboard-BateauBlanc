import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, TextField, InputAdornment } from '@mui/material';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { profile } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  });

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {title}
            {subtitle && (
              <Typography component="span" sx={{ color: '#00c853', ml: 1 }}>
                / {subtitle}
              </Typography>
            )}
          </Typography>
        </Box>

        <TextField
          placeholder="Recherche"
          size="small"
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#f5f5f5',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#9e9e9e" />
              </InputAdornment>
            ),
          }}
        />

        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5',
            '&:hover': {
              backgroundColor: darkMode ? '#2a2a2a' : '#e0e0e0',
            },
          }}
        >
          {darkMode ? <Moon size={18} color="white" /> : <Sun size={18} color="#ffa726" />}
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          <Bell size={18} />
        </IconButton>

        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: '#00c853',
            cursor: 'pointer',
          }}
        >
          {profile?.full_name?.charAt(0) || 'U'}
        </Avatar>

        <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 50 }}>
          {currentDate}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
