if (!window.webln) {
  console.error("You're missing a WebLN Browser");
  return;
}
if (!window.webln.request) {
  alert("Your WebLN Browser does not support the request function");
}
await window.webln.enable();
const response = await window.webln.request("channels", {});
console.log(response);
setChannels(response.channels);