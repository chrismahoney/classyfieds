import React, {
  useState,
  useEffect
} from 'react';

import {
  Link
} from 'react-router-dom';

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
    fetch(apiUrl)
      .then((res) => res.json())
      .then((listings) => {
        setAppState({ loading: false, listings: listings.data });
      })
      .catch((err) => setAppState({ loading: false, listings: [], error: err }));
  }, [setAppState])

  return (
    <div className="root">
      <div>
        <h1>All Listings</h1>
      </div>
      {!appState.error && appState.isLoading && (
        <div className="loadingContainer">Loading...</div>
      )}
      {!appState.error && appState.listings.length > 0 && !appState.isLoading && (
        <div className="listingsContainer">
          {appState.listings.map(listing => (
            <div className="listing">
              <Link to={`/listing/${listing._id}`}>Link</Link>
              <div>{JSON.stringify(listing)}</div>
            </div>
          ))}
        </div>
      )}

      {appState.error && (
        <div className="error">{appState.error}</div>
      )}
    </div>
  );
}

export default Listings;