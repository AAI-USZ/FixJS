function(err) {
  var doReload = window.confirm('Whoooops! Something went wrong! We will reload now, ok?');
  if (doReload)
    window.location.reload();
}