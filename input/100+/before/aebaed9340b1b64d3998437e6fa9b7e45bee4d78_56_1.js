function(name_or_config_object, 
                       button_array, 
                       filter_array, 
                       special_button_array, 
                       custom_button_array)
  {
    ids [ this.id = getId() ] = this;
    if (typeof name_or_config_object === "object")
    {
      var name = name_or_config_object.view;
      this.groups = name_or_config_object.groups;
      // Add a plain button array to support deactivating etc.,
      // initialize Switches and SingleSelect objects 
      this.buttons = [];
      this.filters = [];
      for (var i = 0, group; group = this.groups[i]; i++)
      {
        if (group.type !== UI.TYPE_INPUT && group.items)
          this.buttons = this.buttons.concat(group.items);

        // inititalize switches here
        if (group.type === UI.TYPE_SWITCH)
        {
          var keys = group.items.map(function(switch_) { return switch_.key } );
          new Switches(this.id, keys);
        }
        else if (group.type === UI.TYPE_SINGLE_SELECT)
        {
          var values = group.items.map(function(button) { return button.value } );
          new SingleSelect(name, group.name, values, group.default_value || values[0], group.allow_multiple_select);
        }
        else if (group.type === UI.TYPE_INPUT)
        {
          for (var k = 0, search; search = group.items[k]; k++)
            this.filters.push(search);
        }
      }
    }
    else
    {
      var name = name_or_config_object;
      this.buttons = button_array || [];
      this.groups = [{items: this.buttons}];
      this.filters = filter_array || [];
      this.specials = special_button_array || [];
      this.customs = custom_button_array || [];
    }
    this.container_ids = [];
    this.__is_visible = true;
    if(!window.toolbars)
    {
      window.toolbars = {};
    }
    window.toolbars[name] = this;
  }