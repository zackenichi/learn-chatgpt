import { Container, Grid } from '@mui/material';
import React from 'react';

const Layout = (props) => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
