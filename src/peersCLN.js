import { useRef, useState, useEffect } from "react";

import PulseLoader from "react-spinners/PulseLoader";

function Peers(props) {

  const [peers, setPeers] = useState([]);

  useEffect(() => {
    //loadPeers();
  }, []);

  async function loadPeers() {
    await window.webln.enable();
    const response = await window.webln.request("listpeers", {});
    console.log(response);
    setPeers(response.peers);
  }

  async function disconnect(pubkey) {
    console.log(`Disconnecting ${pubkey}`);
    await window.webln.enable();

    const response = await window.webln.request("disconnect", {id: pubkey});
    console.log(response);
    alert("done");
  }

   

  return (
    <div>
      <button className="btn btn-primary" onClick={loadPeers}>Load Peers</button>
      <table className="table w-full">
        <thead>
          <tr>
            <td style={{ background: "none" }}>Pubkey</td>
            <td style={{ background: "none" }}>connected</td>
            <td style={{ background: "none" }}>channel count</td>
          </tr>
        </thead>
        <tbody>
          {peers.map((peer, key) => {
            return (<tr key={key}>
              <td style={{ background: "none" }}>{peer.id}</td>
              <td style={{ background: "none" }}>{`${peer.connected}`}</td>
              <td style={{ background: "none" }}>{peer.channels?.length}</td>
              <td style={{ background: "none" }}>
                <button onClick={() => { disconnect(peer.id); }}>
                  disconnect
                </button>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Peers;
