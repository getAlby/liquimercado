import { useRef, useState, useEffect } from "react";

import PulseLoader from "react-spinners/PulseLoader";

const LiqAdsUrl = 'https://gist.githubusercontent.com/kiwiidb/e8106fa363dfbc61b4d93553a253bde4/raw/2c27a9812e90df06c774184f30c578105fe093d9/liquidity_ads.json';

function LiqAds(props) {

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    loadAds();
  }, []);

  async function loadAds() {
    try {
      const response = await fetch(LiqAdsUrl);
      const nodes = await response.json();
      setNodes(nodes);
    } catch (e) {
      console.error(e);
      alert(`Something went wrong ${e.message}`);
    }
  }

  async function connectTo(pubkey) {
    await window.webln.enable();
    const response = await window.webln.request("connect", {id: pubkey})
    console.log(response);    
    alert("done");
  }

  async function fundChannel(pubkey) {
    console.log(`Opening a channel with #{pubkey}`);
    await window.webln.enable();

    console.log("Connecting to ${pubkey}");
    const connectResponse = await window.webln.request("connect", {id: pubkey})
    console.log(connectResponse);
    
    const amount = prompt("Amount:");
    console.log(amount);

    const fundResponse = await window.webln.request("funchannel", {id: pubkey, amount: amount})
    console.log(fundResponse);

    alert('Done');
  }

  async function dualFundChannel(pubkey, compact_lease) {
    console.log(`Dual funding a channel with #{pubkey}`);
    await window.webln.enable();

    console.log(`Connecting to ${pubkey}`);
    const connectResponse = await window.webln.request("connect", {id: pubkey})
    console.log(connectResponse);
    
    const localAmountStr = prompt("Local Amount:");
    const localAmount = parseInt(localAmountStr);
    console.log(localAmount);
    const requestedAmountStr = prompt("Requested amount:");
    const requestedAmount = parseInt(requestedAmountStr);


    console.log({id: pubkey, amount: localAmount, request_amt: requestedAmount, compact_lease: compact_lease});
    const fundResponse = await window.webln.request("fundchannel", {id: pubkey, amount: localAmount, request_amt: requestedAmount, compact_lease: compact_lease})
    console.log(fundResponse);

    alert('Done');
  }
  
  return (
    <div>
      <button className="btn btn-primary" onClick={loadAds}>Load Ads</button>
      <table className="table w-full">
        <thead>
          <tr>
            <td style={{ background: "none" }}>Node name</td>
            <td style={{ background: "none" }}>Pubkey</td>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node, key) => {
            return (<tr key={key}>
              <td style={{ background: "none" }}>{node.alias}</td>
              <td style={{ background: "none" }}>{node.nodeid}</td>
              <td style={{ background: "none" }}><button onClick={(e) => { connectTo(node.nodeid) }}>connect</button></td>
              <td style={{ background: "none" }}><button onClick={(e) => { fundChannel(node.nodeid) }}>Open Channel</button></td>
                            <td style={{ background: "none" }}><button onClick={(e) => { dualFundChannel(node.nodeid, node.option_will_fund.compact_lease) }}>Dual fund Channel</button></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LiqAds;
