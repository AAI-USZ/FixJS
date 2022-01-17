function()
  {

    if( __selected_window )
    {
      if( !__windows_reloaded[__selected_window] )
      {
        __windows_reloaded[__selected_window] = 1;
      }
      var rt_id = this.getRuntimeIdsFromWindow(__selected_window)[0];
      if (rt_id)
      {
        if(services.exec && services.exec.is_implemented && 
          // For background processes we can not use the exec service.
          // Background processes have no UI window to dispatch an exec command.
          // Background processes so far are e.g. unite services or 
          // extension background processes.
          // They all use the widget protocol.
           __runtimes[rt_id].uri.indexOf("widget://") != 0)
        {
          // tag 1 is a resreved tag for callbacks to be ignored
          services.exec.requestExec(1,
              [[["reload", null, window.window_manager_data.get_debug_context()]]]);
        }
        else
        {
          services['ecmascript-debugger'].requestEval(0, [rt_id, 0, 0, 'location.reload()']);
        }
      }
    }
  }