function (item) {
      var sourcenode, newnode;
      Utilities.assert(item.name.length, 'No name for item');
      switch(item.type) {
        case 'ask': // 'task':
        sourcenode = tasks[ item.name ];
        Utilities.assert(sourcenode, 'No ask template for item');
        case 'listen': // 'Dog::RoutedEvent':
        sourcenode = sourcenode || listens[ item.name ];
        Utilities.assert(sourcenode, 'No listen template for item');
        newnode = sourcetotarget( sourcenode, item );
        if (newnode) {
          newnode.method = 'post';
          newnode.action = '/dog/stream.json?id=' + item.id;
          // use AJAX for `form` submission
          Utilities.ajaxify(newnode);
          if ((item.name + 'msg') in notifys) { // TODO XXX HACK
            var subscriber = new Poller('/dog/stream/' + item.id, pollinterval, pollcount);
            subscriber.on('poll', onpolllist);
            subscriber.poll();
          }
        }
        break;
        case 'notify': // 'Dog::RoutedMessage':
        sourcenode = notifys[ item.name ];
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