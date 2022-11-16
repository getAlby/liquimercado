import { useRef, useState, useEffect } from "react";

import PulseLoader from "react-spinners/PulseLoader";

function Channels(props) {

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    loadChannels();
  }, []);

  async function loadChannels() {
    await window.webln.enable();
    const channelResponse = await window.webln.request("channels");
    const peersResponse = await window.webln.request("peers");
    console.log(channelResponse);
    setChannels(channelResponse.channels);
  }

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <td style={{ background: "none" }}>Remote pub key</td>
          <td style={{ background: "none" }}>local balance</td>
        </tr>
      </thead>
      <tbody>
        {channels.map((channel, key) => {
          return (<tr key={key}>
            <td style={{ background: "none" }}>{channel.remote_pubkey}</td>
            <td style={{ background: "none" }}>{channel.local_balance}</td>
          </tr>);
        })}
      </tbody>
    </table>
  );
}

export default Channels;
