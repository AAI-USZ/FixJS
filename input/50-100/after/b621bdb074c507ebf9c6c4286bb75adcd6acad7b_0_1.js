function() {
      var res = handler.apply(sub, params || []);

      // if Meteor._RemoteCollectionDriver is available (defined in
      // mongo-livedata), automatically wire up handlers that return a
      // Cursor.  otherwise, the handler is completely responsible for
      // delivering its own data messages and registering stop
      // functions.
      //
      // XXX generalize
      if (Meteor._RemoteCollectionDriver && (res instanceof Meteor._Mongo.Cursor))
        sub._publishCursor(res);
      else if ('_publish' in res) {
        res._publish(sub);
      }
    }