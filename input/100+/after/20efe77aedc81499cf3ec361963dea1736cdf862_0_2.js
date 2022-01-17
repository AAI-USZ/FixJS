function (item) {
      var sourcenode, newnode;
      Utilities.assert(item.name.length, 'No name for item');
      switch(item.type) {
        // case 'Dog::RoutedTask':
        case 'ask':
        sourcenode = asks[ Utilities.last(item.name) ];
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
        }
        break;
        // case 'Dog::RoutedMessage':
        case 'notify':
        sourcenode = notifys[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No notify template for item');
        if (!(item.id in streamobjectseen)) {
          newnode = sourcetotarget( sourcenode, item );
          streamobjectseen[ item.id ] = true;
        }
        break;
        // case 'Dog::Track'
        case 'track':
        if (!(item.id in streamobjectseen)) {
          var req = new Request();
          req.on('success', onpoll);
          req.get('/dog/stream/' + item.id);
          streamobjectseen[ item.id ] = true;
        }
        break;
        case 'oneach':
        sourcenode = oneachs[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No oneach template for item');
        if (sourcenode.attributes['subscribe'] && sourcenode.attributes['subscribe'].value.match(/true/i)) {
          var subscriber = new Poller('/dog/stream/' + item.id, pollinterval, pollcount);
          subscriber.on('poll', onpoll);
          subscriber.poll();
        }
        break;
        default:
        throw new Error('Invalid type specification for item');
      }
    }