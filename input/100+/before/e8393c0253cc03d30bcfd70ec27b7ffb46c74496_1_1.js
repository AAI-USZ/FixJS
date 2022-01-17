function(test) {
      test.numAssertions = 2;

      var eventDispatcher = new Pusher.EventsDispatcher();

      var callbackCalled = false;
      var callback = function() {
        callbackCalled = true;
      };
      eventDispatcher.bind('test_event', callback);

      test.equal(1, eventDispatcher.callbacks['test_event'].length);

      eventDispatcher.unbind('test_event', callback);

      eventDispatcher.emit('test_event', {});      
      test.equal(callbackCalled, false, "Unbound callback should not have been called.");

      test.finish();
    }