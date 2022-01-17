function (item) {
      var sourcenode, newnode;
      Utilities.assert(item.name.length, 'No name for item');
      switch(item.type) {
        // case 'Dog::RoutedTask':
        case 'ask':
        sourcenode = tasks[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No ask template for item');
        // case 'Dog::RoutedEvent':
        case 'listen':
        sourcenode = sourcenode || listens[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No listen template for item');
        newnode = sourcetotarget( sourcenode, item );
        if (newnode) {
          newnode.method = 'post';
          newnode.action = '/dog/stream/' + item.id;
          // use AJAX for `form` submission
          Utilities.ajaxify(newnode);
          // FIXME can't just check without the 's'
          if (Utilities.last(item.name).slice(0,-1) in notifys) {
            var subscriber = new Poller('/dog/stream/' + item.id, pollinterval, pollcount);
            subscriber.on('poll', onpolllist);
            subscriber.poll();
          }
        }
        break;
        // case 'Dog::RoutedMessage':
        case 'notify':
        sourcenode = notifys[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No notify template for item');
        if (!(item.id in notifyseen)) {
          newnode = sourcetotarget( sourcenode, item );
          notifyseen[ item.id ] = true;
        }
        break;
        default:
        throw new Error('Invalid type specification for item');
      }
    }