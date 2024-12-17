import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import PartyButton from './components/PartyButton';
import BarList from './components/BarList';
import MapView from './components/MapView';

function App() {
  // State to manage visibility of different UI components
  const [view, setView] = useState('party'); // 'party', 'bars', 'map'
  const [ads, setAds] = useState([]); // Ads data
  const [bars, setBars] = useState([]); // Bars data
  const [selectedBar, setSelectedBar] = useState(null); // Selected bar for map view

  // Fetch ads and bars when the app loads
  useEffect(() => {
    async function fetchAdsAndBars() {
      try {
        // Mock fetch for ads
        const adsResponse = await fetch('/api/get-ads');
        const adsData = await adsResponse.json();
        setAds(adsData);

        // Mock fetch for bars
        const barsResponse = await fetch('/api/best-bars');
        const barsData = await barsResponse.json();
        setBars(barsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchAdsAndBars();
  }, []);

  // Handlers to toggle views
  const handleAllowLocation = () => {
    setView('bars'); // Show bars after allowing location
  };

  const handleShowMap = (bar) => {
    setSelectedBar(bar);
    setView('map'); // Show map for the selected bar
  };

  const handleBackToParty = () => {
    setView('party');
  };

  return (
    <div className="App">
      {view === 'party' && (
        <>
          <Header ads={ads} hideAds />
          <Carousel />
          <PartyButton onAllowLocation={handleAllowLocation} />
          <Footer ads={ads} hideAds />
        </>
      )}

      {view === 'bars' && (
        <>
          <Header ads={ads} />
          <BarList bars={bars} onShowMap={handleShowMap} />
          <Footer ads={ads} />
        </>
      )}

      {view === 'map' && selectedBar && (
        <>
          <Header ads={ads} />
          <MapView bar={selectedBar} />
          <button onClick={() => setView('bars')} className="back-button">
            Back to Bar List
          </button>
          <Footer ads={ads} />
        </>
      )}

      {view !== 'party' && (
        <button onClick={handleBackToParty} className="home-button">
          Back to Party
        </button>
      )}
    </div>
  );
}

export default App;
