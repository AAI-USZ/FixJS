function() {
      controller.addEvent("session1_after_session_context");

      // simulate a restart of the dialog.  Clear the session_context and then
      // re-get session context.
      controller = null;
      network.clearContext();
      createController({ continuation: true });

      controller.addEvent("session2_before_session_context");
      network.withContext(function() {
        controller.addEvent("session2_after_session_context");

        var events = controller.getCurrentEventStream();

        ok(indexOfEvent(events, "session1_before_session_context") > -1, "session1_before_session_context correctly saved to current event stream");
        ok(indexOfEvent(events, "session1_after_session_context") > -1, "session1_after_session_context correctly saved to current event stream");
        ok(indexOfEvent(events, "session2_before_session_context") > -1, "session2_before_session_context correctly saved to current event stream");
        ok(indexOfEvent(events, "session2_after_session_context") > -1, "session2_after_session_context correctly saved to current event stream");

      });

      start();
    }