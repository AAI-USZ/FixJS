function(services)
  {
    var last_selected_view = UI.get_instance().retrieve_last_selected_view();
    var open_windows = UIWindowBase.close_all_windows();
    var tabs = viewport.getElementsByTagName('tab'), i = 0, tab = null;
    for( ; tab = tabs[i]; i++)
    {
      if( tab.hasClass('active') )
      {
        messages.post("hide-view", {id: tab.getAttribute('ref-id')});
      }
    }
    for (var id in window.views)
    {
      window.views[id].reset_containers();
    }
    viewport.innerHTML = '';
    new TopCell
    (
      ui_framework.layouts.main_layout,
      null,
      null,
      TopToolbar,
      services
    );
    windowsDropDown.update();
    var view_id = global_state && global_state.ui_framework.last_selected_tab;
    if(  view_id && views[view_id] && !views[view_id].isvisible())
    {
      window.topCell.showView(view_id);
    }
    if(global_state.ui_framework.spin_state)
    {
      messages.post("host-state", {state: global_state.ui_framework.spin_state});
    }
    setTimeout(function(){
      open_windows.forEach(function(view_id){UIWindowBase.showWindow(view_id)});
    }, 250);
    if (last_selected_view)
    {
      var esdi = window.services['ecmascript-debugger'];
      var cb = this._on_ecmascript_enabled.bind(this, last_selected_view);
      esdi.add_listener('enable-success', cb);
    }
  }