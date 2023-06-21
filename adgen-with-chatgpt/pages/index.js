import ResultsContainer from '@/components/results';
import Search from '@/components/search';
import { Grid } from '@mui/material';
import { Fragment, useRef, useState } from 'react';

export default function HomePage() {
  const urlRef = useRef();
  const [siteData, setSiteData] = useState([]);

  const handleScrape = () => {
    console.log(urlRef.current.value);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Search urlRef={urlRef} onScrape={handleScrape} />
        </Grid>
        {siteData.length > 0 && (
          <Grid item xs={12}>
            <ResultsContainer />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
}
