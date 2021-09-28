import React, {
  useState,
  useEffect
} from 'react';

import {
  Link,
  useParams
} from 'react-router-dom';

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
    const apiUrl = `http://localhost:5000/listings/`;
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
        <Link to={"/"}>Back to listings</Link>
      </div>
      <div>
        <h1>Listing: {id}</h1>
      </div>
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
    </div>
  );
}

export default Listings;