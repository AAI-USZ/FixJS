function() {
      var data = controller.getCurrent();

      // Make sure expected items are in the current stored data.
      testHelpers.testKeysInObject(data, ["event_stream", "sample_rate", "timestamp", "lang"]);

      controller.addEvent("after_session_context");

      events = controller.getCurrentEventStream();
      // Make sure both the before_session_context and after_session_context
      // are both on the event stream.
      ok(indexOfEvent(events, "before_session_context") > -1, "before_session_context correctly saved to current event stream");
      ok(indexOfEvent(events, "after_session_context") > -1, "after_session_context correctly saved to current event stream");


      // Ensure that the event name as well as relative time are saved for an
      // event.
      var index = indexOfEvent(events, "after_session_context");
      var event = events[index];

      ok(index > -1, "after_session_context correctly saved to current event stream");
      equal(event[0], "after_session_context", "name stored");
      equal(typeof event[1], "number", "time stored");

      start();
    }