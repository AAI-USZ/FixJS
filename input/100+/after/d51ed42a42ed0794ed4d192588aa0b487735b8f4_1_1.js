function(services)
  {
    var layouts = ui_framework.layouts;
    var ui = UI.get_instance();
    var modebar_dom = ui.register_modebar('dom', HorizontalNavigation);
    new CompositeView('dom_mode',
                      ui_strings.M_VIEW_LABEL_COMPOSITE_DOM,
                      layouts.dom_rough_layout,
                      'dom',
                      services);
    new CompositeView('js_mode',
                      ui_strings.M_VIEW_LABEL_COMPOSITE_SCRIPTS,
                      layouts.js_rough_layout,
                      'scripts',
                      services);
    new CompositeView('network_mode',
                      ui_strings.M_VIEW_LABEL_NETWORK,
                      layouts.network_rough_layout,
                      null,
                      services);
    new CompositeView('storage',
                      ui_strings.M_VIEW_LABEL_STORAGE,
                      layouts.storage_rough_layout,
                      null,
                      services);
    new CompositeView('console_mode',
                      ui_strings.M_VIEW_LABEL_COMPOSITE_ERROR_CONSOLE,
                      layouts.error_console_rough_layout,
                      null,
                      services);
    new CompositeView('utils',
                      ui_strings.M_VIEW_LABEL_UTILITIES,
                      layouts.utils_rough_layout,
                      null,
                      services);
    new CompositeView('resource_panel',
                      ui_strings.M_VIEW_LABEL_RESOURCES,
                      layouts.resource_rough_layout);
    new CompositeView('console_panel',
                      ui_strings.M_VIEW_LABEL_COMMAND_LINE,
                      layouts.console_rough_layout);
    new CompositeView('profiler_mode',
                      ui_strings.M_VIEW_LABEL_PROFILER,
                      layouts.profiler_rough_layout,
                      null,
                      services);
  }