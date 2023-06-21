import { Grid, Typography } from '@mui/material';

const ResultsContent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={2} xs={12}>
        <Typography fontWeight="bold">Headline:</Typography>
      </Grid>
      <Grid item md={10} xs={12}>
        <Typography>Text</Typography>
      </Grid>
      <Grid item md={2} xs={12}>
        <Typography fontWeight="bold">Body:</Typography>
      </Grid>
      <Grid item md={10} xs={12}>
        <Typography>Text</Typography>
      </Grid>
    </Grid>
  );
};

export default ResultsContent;
