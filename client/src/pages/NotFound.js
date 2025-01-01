import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // If you want to allow navigation back to home

const NotFound = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" paragraph>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
