import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import LiqAds from './liquidity_ads_CLN';
import Peers from './peersCLN';
//import Channels from './channelsCLN';

import albyLogo from './alby-logo-figure.svg';
import albyLogoHead from './alby-logo-head.svg';

function App() {

  useEffect(() => {
    if (!window.webln) {
      console.error("You're missing a webln browser");
    }
  }, []);

  return (
    <>
      <div><Toaster /></div>
      <div className="from-primary to-secondary text-primary-content bg-gradient-to-br min-h-screen pt-6">
        <div className="text-center p-4">
          <p className="text-2xl text-bold mb-2">
            <img src={albyLogoHead} className="w-6 h-6 inline mr-2" />WebLN Liquidity Marketplace Demo  🚀
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Ads</h3>
          <LiqAds />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Peers</h3>
          <Peers />
        </div>
        

        <div className="text-center">
          <a href="https://getalby.com" target="_blank"><img src={albyLogo} alt="Powered by Alby" className="inline" /></a>
        </div>
      </div>

    </>
  )

}

export default App;
