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
  Typography
} from '@mui/material';

const Listings = () => {
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
    fetch(apiUrl)
      .then((res) => res.json())
      .then((listing) => {
        setAppState({ loading: false, listing: listing.data });
      })
      .catch((err) => setAppState({ loading: false, listing: {}, error: err }));
  }, [setAppState])

  return (
    <div className="root">
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          All Listings
        </Typography>
        <div>
          <Link to={"/"}>Back to listings</Link>
        </div>
      </Container>
      <Container style={{ margin: 20}}>
        {!appState.error && appState.isLoading && (
          <div className="loadingContainer">Loading...</div>
        )}
        {!appState.error && appState.listing && !appState.isLoading && (
          <div className="listingContainer">
            {JSON.stringify(appState.listing)}
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