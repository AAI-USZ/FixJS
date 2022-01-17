function(services)
  {
    // return a layout depending on services
    // e.g. services['ecmascript-debugger'].version
    // e.g. services['ecmascript-debugger'].is_implemented
    return [
      'dom_mode',
      {view: 'js_mode', tab_class: JavaScriptTab},
      'network_mode',
      'resource_panel',
      'storage',
      {view: 'console_mode', tab_class: ErrorConsoleTab},
      'utils',
      'console_panel'
    ];
  }