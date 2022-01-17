function() {
    // Desired sequence:
    // 1. When session_context completes, initialize this session's interaction
    // data, sends previous session's data.
    // 2. when network.sendInteractionData completes, previous session's data is
    // erased, current session's data is unaffected.

    // simulate data stored for last session
    model.push({ timestamp: new Date().getTime() });

    createController(true);

    controller.addEvent("before_session_context");

    var events = controller.getCurrentEventStream();
    ok(indexOfEvent(events, "before_session_context") > -1, "before_session_context correctly saved to event stream");

    // Add an XHR delay to simulate interaction_data completeing after
    // session_context completes.
    xhr.setDelay(5);

    mediator.subscribe("interaction_data_send_complete", function() {
      var data = controller.getCurrent();

      // Make sure expected items are in the current stored data.
      testHelpers.testKeysInObject(data, ["event_stream", "sample_rate", "timestamp", "lang"]);

      controller.addEvent("after_session_context");
      controller.addEvent("after_session_context");

      // The next two are translated from mediator names to names usable by the
      // KPI backend.

      // translated to "translated_name"
      controller.addEvent("initial_string_name");
      // translated to "function_translation.initial_function_name"
      controller.addEvent("initial_function_name");

      events = controller.getCurrentEventStream();
      // Make sure both the before_session_context and after_session_context
      // are both on the event stream.
      ok(indexOfEvent(events, "before_session_context") > -1, "before_session_context correctly saved to current event stream");
      ok(indexOfEvent(events, "after_session_context") > -1, "after_session_context correctly saved to current event stream");
      ok(indexOfEvent(events, "translated_name") > -1, "string translation - translated_name correctly saved to current event stream");
      ok(indexOfEvent(events, "function_translation.initial_function_name") > -1, "function translation - function_translation.initial_function_name correctly saved to current event stream");


      // Ensure that the event name as well as relative time are saved for an
      // event.
      var index = indexOfEvent(events, "after_session_context");
      var event = events[index];

      ok(index > -1, "after_session_context correctly saved to current event stream");
      equal(event[0], "after_session_context", "name stored");
      equal(typeof event[1], "number", "time stored");

      start();
    });

    network.withContext();
  }