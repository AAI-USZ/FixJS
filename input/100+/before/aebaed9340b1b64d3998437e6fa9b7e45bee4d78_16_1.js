function(status, message, win_id)
  {
    if (message[RUNTIME_LIST])
      message[RUNTIME_LIST].forEach(self.handleRuntime, self);
    host_tabs.setActiveTab(win_id);
    if (message[RUNTIME_LIST] && message[RUNTIME_LIST].length)
    {
      if (settings.runtimes.get('reload-runtime-automatically'))
        self.reloadWindow();
    }
    else
    {
      if (win_id in __window_ids)
        cleanupWindow(win_id);
      else
        __window_ids[win_id] = true;
      __selected_runtime_id = '';
      __selected_script = '';
      views['js_source'].update();
      window['cst-selects']['js-script-select'].updateElement();
      window['cst-selects']['cmd-runtime-select'].updateElement();
    }
  }