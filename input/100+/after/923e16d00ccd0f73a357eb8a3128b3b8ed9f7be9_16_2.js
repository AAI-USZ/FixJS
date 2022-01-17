function()
  {
    if (__selected_window)
    {
      if (!__windows_reloaded[__selected_window])
        __windows_reloaded[__selected_window] = 1;

      var rt_id = this.getRuntimeIdsFromWindow(__selected_window)[0];
      if (window.services['ecmascript-debugger'] &&
          window.services['ecmascript-debugger'].is_enabled &&
          // For background processes we can not use the exec service.
          // Background processes have no UI window to dispatch an exec command.
          // Background processes so far are e.g. unite services or 
          // extension background processes.
          // They all use the widget protocol.
          ((rt_id && __runtimes[rt_id].uri.indexOf("widget://") != -1) ||
           !(window.services.exec && window.services.exec.is_implemented)))
      {
        var msg = [rt_id, 0, 0, 'location.reload()'];
        window.services['ecmascript-debugger'].requestEval(0, msg);
      }
      else if (window.services.exec && window.services.exec.is_implemented)
      {
        var msg = [[["reload",
                     null,
                     window.window_manager_data.get_debug_context()]]];
        window.services.exec.requestExec(cls.TagManager.IGNORE_RESPONSE, msg);
      }
    }
  }