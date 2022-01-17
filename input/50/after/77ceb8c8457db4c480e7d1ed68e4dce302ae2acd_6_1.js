function(err) {
  // We ignore connection errors here, because our OfflineBar handles it
  if (err.type === 'connectionerror')
    return;

  var doReload = window.confirm('Whoooops! Something went wrong! We will reload now, ok?');
  if (doReload)
    window.location.reload();
}