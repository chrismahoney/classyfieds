import React, {
  useState,
  useEffect
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  Container,
  Typography,
  Grid
} from '@mui/material';
import ListingCard from '../Components/ListingCard';

import Authentication from '../services/Authentication';

const Listings = () => {
  const [appState, setAppState] = useState({
    loading: true,
    listings: [],
    error: null
  });

  /**
   * We only want fetches to occur when app state
   * has changed, therefore listing pulls occur within
   * a useEffect hook below.
   */
  useEffect(() => {
    const apiUrl = `http://localhost:5000/listings`;
    fetch(apiUrl, {
        headers: Authentication.getAuthHeader()
      })
      .then((res) => {
        return res.json();
      })
      .then((listings) => {
        setAppState({ loading: false, listings: listings.data });
      })
      .catch((err) => setAppState({ loading: false, listings: [], error: err }));
  }, [setAppState])

  return (
    <div className="root">
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          All Listings
        </Typography>
      </Container>

      <Container style={{ margin: 20 }}>
        {!appState.error && appState.isLoading && (
          <div className="loadingContainer">Loading...</div>
        )}
        {!appState.error && appState.listings.length > 0 && !appState.isLoading && (
          <div className="listingsContainer">
            <Grid container spacing={2}>
              {appState.listings.map(listing => (
                <Grid key={listing._id} item xs={3}>
                  <ListingCard listing={listing} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {appState.error && (
          <div className="error">{appState.error}</div>
        )}
      </Container>
    </div>
  );
}

export default Listings;