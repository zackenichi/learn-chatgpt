import RefreshIcon from '@mui/icons-material/Refresh';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button } from '@mui/material';

const ResultsControls = ({ handleClear }) => {
  return (
    <Box>
      <Button
        sx={{
          // width: '150px',
          background: '#FFFFFF',
          textTransform: 'capitalize',
          color: '#621984',
          border: '1px #621984 solid',
          borderRadius: '20px',
          '&:hover': {
            color: '#621984',
            backgroundColor: '#FFFFFF',
            border: '1px #621984 dashed',
          },
        }}
        variant="outlined"
        startIcon={<RefreshIcon />}
      >
        Generate New
      </Button>
      <Button
        onClick={handleClear}
        sx={{
          marginLeft: '10px',
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
        variant="outlined"
        startIcon={<ClearIcon sx={{ color: '#FFFFFF' }} />}
      >
        Clear
      </Button>
    </Box>
  );
};

export default ResultsControls;
