import React, {
  useState,
  useEffect
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

import {
  Container,
  Typography,
  Grid
} from '@mui/material';

import Authentication from '../services/Authentication';

const Listing = () => {
  const { id } = useParams();
  const [appState, setAppState] = useState({
    loading: true,
    listing: {},
    error: null
  });

  /**
   * We only want fetches to occur when app state
   * has changed, therefore listing pulls occur within
   * a useEffect hook below.
   */
  useEffect(() => {
    const apiUrl = `http://localhost:5000/listings/${id}`;
    fetch(apiUrl, {
      headers: Authentication.getAuthHeader()
    })
      .then((res) => {
        return res.json()
      })
      .then((listing) => {
        setAppState({ loading: false, listing: listing.data });
      })
      .catch((err) => setAppState({ loading: false, listing: {}, error: err }));
  }, [setAppState])

  return (
    <div className="root">
      <Container style={{ margin: 20 }}>
        {!appState.error && appState.isLoading && (
          <div className="loadingContainer">Loading...</div>
        )}
        {!appState.error && appState.listing && !appState.isLoading && (
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <img src="https://via.placeholder.com/280x140.png" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4" component="div">
                {appState.listing.title} (${appState.listing.price})
              </Typography>
              <Typography variant="body" component="div" style={{ marginTop: 10 }}>
                {appState.listing.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Link to={"/listings"}>Back to listings</Link>
            </Grid>
          </Grid>
        )}

        {appState.error && (
          <div className="error">{appState.error}</div>
        )}
      </Container>
    </div>
  );
}

export default Listing;