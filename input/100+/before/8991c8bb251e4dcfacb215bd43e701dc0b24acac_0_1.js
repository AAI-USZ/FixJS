function (cursor, options) {
  var self = this;

  // copy my cursor, so that the observe can run independently from
  // some other use of the cursor.
  self.cursor = _Mongo._makeCursor(cursor.mongo,
                                   cursor.collection_name,
                                   cursor.selector,
                                   cursor.options);

  // expose collection name
  self.collection_name = cursor.collection_name;

  // previous results snapshot.  on each poll cycle, diffs against
  // results drives the callbacks.
  self.results = [];

  // state for polling
  self.dirty = false; // do we need polling?
  self.pending_writes = []; // people to notify when polling completes
  self.poll_running = false; // is polling in progress now?
  self.polling_suspended = false; // is polling temporarily suspended?

  // (each instance of the class needs to get a separate throttling
  // context -- we don't want to coalesce invocations of markDirty on
  // different instances!)
  self._markDirty = _.throttle(self._unthrottled_markDirty, 50 /* ms */);

  // listen for the invalidation messages that will trigger us to poll
  // the database for changes
  var keys = self.cursor.options.key || {collection: cursor.collection_name};
  if (!(keys instanceof Array))
    keys = [keys];
  self.crossbar_listeners = _.map(keys, function (key) {
    return Meteor._InvalidationCrossbar.listen(key,function (notification,
                                                             complete) {
      // When someone does a transaction that might affect us,
      // schedule a poll of the database. If that transaction happens
      // inside of a write fence, block the fence until we've polled
      // and notified observers.
      var fence = Meteor._CurrentWriteFence.get();
      if (fence)
        self.pending_writes.push(fence.beginWrite());
      self._markDirty();
      complete();
    });
  });

  // user callbacks
  self.added = options.added;
  self.changed = options.changed;
  self.moved = options.moved;
  self.removed = options.removed;

  // run the first _poll() cycle synchronously.
  self._doPoll();

  // every once and a while, poll even if we don't think we're dirty,
  // for eventual consistency with database writes from outside the
  // Meteor universe
  self.refreshTimer = Meteor.setInterval(_.bind(self._markDirty, this),
                                         10 * 1000 /* 10 seconds */);
}