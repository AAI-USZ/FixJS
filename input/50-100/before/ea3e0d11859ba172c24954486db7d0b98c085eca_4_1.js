function(msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
    {
      __runtimes = {};
      __old_runtimes = {};
      __runtimes_arr = []; // runtime ids
      __window_ids = {};
      __windows_reloaded = {};
      __threads = [];
      __log_threads = false;
      __windowsFolding = {};
      __selected_runtime_id = '';
      __next_runtime_id_to_select = '';
      __selected_script = '';
      updateRuntimeViews();
    }
  }