import { Button, Grid, TextField } from '@mui/material';

const Search = ({ urlRef, onScrape }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={9} xs={12}>
        <TextField
          fullWidth
          placeholder="Enter website url"
          inputRef={urlRef}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <Button
          onClick={onScrape}
          fullWidth
          sx={{
            background: '#621984',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '20px',
            '&:hover': {
              color: '#FFFFFF',
              backgroundColor: '#81479C',
              border: 'none',
            },
          }}
        >
          Start
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
