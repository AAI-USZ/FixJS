function bummer_init() {
  console.log("Asking background for access token");
  Port.postMessage({ type: 'access_token_request' });
}