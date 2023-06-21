import ResultsContainer from '@/components/results';
import Search from '@/components/search';
import { addHttpToUrl, isValidUrl } from '@/helpers/input-utils';
import { Grid, Snackbar, Alert } from '@mui/material';
import { Fragment, useRef, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function HomePage() {
  const urlRef = useRef();
  const [siteData, setSiteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleScrape = async () => {
    const urlInput = urlRef.current.value;
    setIsLoading(true);

    if (isValidUrl(urlInput)) {
      try {
        // make sure input is in proper format
        const encodedUrl = encodeURIComponent(addHttpToUrl(urlInput));

        const scrapeResponse = await axios.get(
          `/api/get-page-text?baseUrl=${encodedUrl}`
        );

        setSiteData(scrapeResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setIsLoading(false);
        setShowError(true);
      }
    } else {
      console.log('Invalid URL');
      setIsLoading(false);
      setShowError(true);
    }
  };

  const handleClear = () => {
    if (urlRef.current) {
      urlRef.current.value = '';
    }
    setSiteData([]);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Search urlRef={urlRef} onScrape={handleScrape} />
        </Grid>
        {siteData.length > 0 && (
          <Grid item xs={12}>
            <ResultsContainer handleClear={handleClear} />
          </Grid>
        )}
      </Grid>
      {isLoading && <LoadingSpinner />}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          Failed to connect to website
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
