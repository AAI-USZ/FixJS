function autoRefresh(store, options, view) {
  if (isProduction) return;
  var views = store._derbyRefreshViews || (store._derbyRefreshViews = [])
    , listeners;

  if (views.indexOf(view) !== -1) return;

  views.push(view);
  listeners = {};

  store.sockets.on('connection', function(socket) {
    socket.on('derbyClient', function(appHash, callback) {
      var reload = true
        , view, i, appFilename, sockets;
      for (i = views.length; i--;) {
        view = views[i];
        if (view._appHash === appHash) {
          reload = false;
          break;
        }
      }
      callback(reload);
      if (reload) return;

      appFilename = view._appFilename;
      if (listeners[appFilename]) {
        return listeners[appFilename].push(socket);
      }

      sockets = listeners[appFilename] = [socket];
      var parsed = files.parseName(appFilename, options)
        , root = parsed.root
        , rootLen = root.length
        , clientName = parsed.clientName;
      addWatches(root, root, clientName, sockets, view);
      view._libraries.forEach(function(library) {
        var watchRoot = library.root
          , pre = watchRoot.slice(0, rootLen)
          , post = watchRoot.slice(rootLen)
        // If the compoent is within the root directory and not under a
        // node_modules directory, it's files will be watched already
        if (pre === root && post.indexOf('/node_modules/') === -1) return;
        addWatches(library.root, root, clientName, sockets, view);
      })
    });
  });
}