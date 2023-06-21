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

  const handleTest = async () => {
    const animalInput = urlRef.current.value;
    setIsLoading(true);

    try {
      const response = await axios.post('/api/test-chatgpt', {
        animal: animalInput,
      });

      const data = response.data;
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setIsLoading(false);
      console.dir(data.result, { depth: null });
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleScrape = async () => {
    const urlInput = urlRef.current.value;
    setIsLoading(true);

    if (isValidUrl(urlInput)) {
      try {
        // Make sure input is in proper format
        // const encodedUrl = encodeURIComponent(addHttpToUrl(urlInput));

        // Fetch ad headline and body using the API route
        // const scrapeResponse = await axios.get(
        //   `/api/generate-headlines?baseUrl=${encodedUrl}`
        // );

        // const { adHeadline, adBody } = scrapeResponse.data;

        // const { adHeadline } = scrapeResponse.data;

        // setSiteData(scrapeResponse.data);
        setIsLoading(false);

        // Do something with the generated ad headline and body
        // console.log('Ad Headline:', adHeadline);
        // console.log('Ad Body:', adBody);
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
          <Search
            urlRef={urlRef}
            // onScrape={handleScrape}
            onScrape={handleTest}
          />
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
