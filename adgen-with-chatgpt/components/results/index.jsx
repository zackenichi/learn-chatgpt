import { Grid } from '@mui/material';
import React from 'react';
import ResultsControls from './results-controls';

const ResultsContainer = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ResultsControls />
      </Grid>
    </Grid>
  );
};

export default ResultsContainer;
