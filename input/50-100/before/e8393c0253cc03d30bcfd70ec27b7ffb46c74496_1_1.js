function(test) {
      test.numAssertions = 2;

      var eventDispatcher = new Pusher.EventsDispatcher();
      var callback = function() {};
      eventDispatcher.bind('test_event', callback);

      test.equal(1, eventDispatcher.callbacks['test_event'].length);
      test.equal(callback, eventDispatcher.callbacks['test_event'][0]);

      test.finish();
    }