function(view_id, toolbar)
  {        
    this.filters = toolbars[view_id] && toolbars[view_id].filters || [];
    this.buttons = toolbars[view_id] && toolbars[view_id].buttons || [];
    this.groups = toolbars[view_id] && toolbars[view_id].groups || [];
    this.switches = switches[view_id] && switches[view_id].keys || [];
    this.single_selects = single_selects[view_id];
    this.toolbar_settings = window.toolbar_settings && window.toolbar_settings[view_id] || null;
    this.specials = toolbars[view_id] && toolbars[view_id].specials || [];
    this.customs = toolbars[view_id] && toolbars[view_id].customs || [];
    this.__view_id = view_id;

    if (toolbars[view_id])
      this.__is_visible = toolbars[view_id].getVisibility();

    var search = this.filters.length && UI.get_instance().get_search(view_id);
    if (this.__is_visible)
    {
      if (this.filters.length)
      {
        toolbar.render(templates.filters(this.filters));
      }
      if (search)
      {
        toolbar.render(templates.search_button(search));
      }
      if (this.groups.length)
      {
        var group_templates = [];
        for (var i = 0, group; group = this.groups[i]; i++)
        {
          var button_templates = [];
          // The templated will be collected in button_templates, to be then passed to 
          // another template function. That is because a button can have a .template member
          // which defines a custom template
          if (group.items && group.type !== "input")
          {
            var current_value = null;
            for (var j = 0, button; button = group.items[j]; j++)
            {
              if (group.type === "single-select")
              {
                var values = window.single_selects;
                values = (values = values[view_id]) && (values = values[group.name]) && (values = values.values);
                button_templates.push(templates.single_select_button(button, values));
              }
              else if (group.type === "switch")
              {
                button_templates.push(templates._switch(button.key));
              }
              else if (button.template)
              {
                button_templates.push(button.template(views[view_id]));
              }
              else
              {
                button_templates.push(templates.toolbar_button(button));
              }
            }
            group_templates.push(templates.toolbar_group_wrapper(button_templates, group, view_id));
          }
        }
        toolbar.render(group_templates);
      }
      if(this.switches.length) // the following is legacy support
      {
        toolbar.render(templates.switches(this.switches));
      }
      if(this.toolbar_settings)
      {
        toolbar.render(templates.toolbar_settings(this.toolbar_settings));
      }
      if(this.specials.length)
      {
        toolbar.render(templates.buttons(this.specials));
      } 
      if(this.customs.length)
      {
        var custom = null, i = 0;
        for( ; custom = this.customs[i]; i++)
        {
          toolbar.render(custom.template(views[view_id]));
        } 
      } 
    }
  }