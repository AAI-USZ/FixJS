function onpolllist(data) {
    data['items'].forEach(function (item) {
      if (!(item.id in handlerseen)) {
        var req = new Request();
        req.on('success', onpoll);
        req.get('/dog/stream/' + item.id);
        handlerseen[ item.id ] = true;
      }
    });
  }