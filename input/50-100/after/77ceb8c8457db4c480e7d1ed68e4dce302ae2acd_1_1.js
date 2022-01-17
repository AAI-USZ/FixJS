function(user) {
  console.log('Unload detected. Marking backend object as destroyed.');
  // Overwrite in Implementation
  if (window.RPC) window.RPC.destroy();
  if (window.API) window.API.destroy();
}