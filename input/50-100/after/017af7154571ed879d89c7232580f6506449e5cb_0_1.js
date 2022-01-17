function(collection, query, event, data) {
          if(arguments.length === 4) {
            session.emitToUsers(collection, query, event, data);
          } else if(arguments.length <= 2) {
            event = collection;
            data = query;
            session.emitToAll(event, data);
          }
        }