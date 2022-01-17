function(view_id, key_map, label_map, setting_map, templates, group, callback_map)
  {
    this.map = {};
    this.view_id = view_id;
    this.label_map = label_map;
    this.setting_map = setting_map;
    this.templates = templates || {};
    this.group = group;
    this.callback_map = callback_map || {};
    var stored_map = key_map, key = '', val = '';
    for( key in stored_map)
    {
      val = window.localStorage.getItem(key);
      this.map[key] = (val === undefined || val === null) ? key_map[key] : 
                      val === 'undefined' ? undefined : JSON.parse(val);
    }
    if(!window.settings)
    {
      window.settings = {};
    }
    window.settings[arguments[0]] = this;

    window.messages.post("settings-initialized", {view_id: view_id, setting: this});

    // Add a context menu
    var contextmenu = ContextMenu.get_instance();
    var menu = setting_map && setting_map.contextmenu;
    if (menu)
    {
      var items = [];
      for (var i = 0, item; item = menu[i]; i++)
      {
        items.push({
          label: label_map[item],
          settings_id: item,
          handler: this._menu_item_handler.bind(this, item)
        });
      }
      contextmenu.register(view_id, items);
    }
  }