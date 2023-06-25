import { Grid } from '@mui/material';
import React from 'react';
import ResultsControls from './results-controls';
import ResultsContent from './ResultsContent';

const ResultsContainer = ({ handleClear }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ResultsControls handleClear={handleClear} />
      </Grid>
      <Grid item xs={12}>
        <ResultsContent />
      </Grid>
    </Grid>
  );
};

export default ResultsContainer;
