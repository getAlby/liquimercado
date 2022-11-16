import { useRef, useState, useEffect } from "react";

import PulseLoader from "react-spinners/PulseLoader";

function Channels(props) {

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    //loadChannels();
  }, []);

  async function loadChannels() {
    console.log("Loading Channels");
    try {
      await window.webln.enable();
      console.log("webln enabled");
      const response = await window.webln.request("listfunds", {});
      console.log(response);
      setChannels(response.channels);
    } catch(e) {
      console.error(e);
      alert(`Something went wrong ${e.message}`);
    }
  }

  return (
    <div>
    <button className="btn btn-primary" onClick={loadChannels}>Load Channels</button>
    <table className="table w-full">
      <thead>
        <tr>
          <td style={{ background: "none" }}>Peer ID</td>
          <td style={{ background: "none" }}>Channel total sat</td>
          <td style={{ background: "none" }}>Channel sat</td>
          <td style={{ background: "none" }}>State</td>
          <td style={{ background: "none" }}>Connected</td>
        </tr>
      </thead>
      <tbody>
        {channels.map((channel, key) => {
          return (<tr key={key}>
            <td style={{ background: "none" }}>{channel.peer_id}</td>
            <td style={{ background: "none" }}>{channel.channel_total_sat}</td>
            <td style={{ background: "none" }}>{channel.channel_sat}</td>
            <td style={{ background: "none" }}>{channel.state}</td>
            <td style={{ background: "none" }}>{`${channel.connected}`}</td>
          </tr>);
        })}
      </tbody>
    </table>
      </div>
  );
}

export default Channels;
