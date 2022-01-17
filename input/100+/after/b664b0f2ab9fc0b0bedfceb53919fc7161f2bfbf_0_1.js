function()
  {
    this.create_top_level_views(window.services);
    this.setup_top_cell(window.services);
    this.create_window_controls();
    if(!arguments.callee._called_once)
    {
      if( window.opera.attached )
      {
        topCell.tab.changeStyleProperty("padding-right", 80);
      }
      if(window.ini.debug)
      {
        if(window.settings.debug.get('show-as-tab'))
        {
          ui_framework.layouts.main_layout.tabs.push('debug_new');
          window.topCell.tab.addTab(new Tab('debug_new', window.views['debug_new'].name));
          window.topCell.onresize();
        }
      }
      // a short workaround to hide some tabs as long as we don't have the dynamic tabs
      var tabs = ui_framework.layouts.error_console_rough_layout.children[0].tabs,
      tab = '',
      i = 1;

      // tabs[0] is skipped, as that is console-all, that should never be hidden.
      for( i = 1; tab = tabs[i]; i++ )
      {
        views[tab].is_hidden = true;
        topCell.disableTab(tab, true);
      }
      arguments.callee._called_once = true;
    }
  }