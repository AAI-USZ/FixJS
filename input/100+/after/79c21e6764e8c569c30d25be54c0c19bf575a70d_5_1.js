function createController(setKPINameTable, config) {
    if (typeof setKPINameTable !== "boolean") {
      config = setKPINameTable;
      setKPINameTable = false;
    }

    config = _.extend({ samplingEnabled: true }, config);
    controller = BrowserID.Modules.InteractionData.create();
    controller.start(config);

    controller.setNameTable({
      before_session_context: null,
      after_session_context: null,
      session1_before_session_context: null,
      session1_after_session_context: null,
      session2_before_session_context: null,
      session2_after_session_context: null,
      initial_string_name: "translated_name",
      initial_function_name: function(msg, data) {
        return "function_translation." + msg;
      }
    });

  }