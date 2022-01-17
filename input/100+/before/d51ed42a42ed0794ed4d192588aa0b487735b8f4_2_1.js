function()
{
  var MAX_ENTRIES = 1000;
  var MIN_RENDER_DELAY = 200;
  this._render_timeout = 0;
  this._rendertime = 0;
  this.needs_instant_update = false;
  this.requierd_services = ["console-logger"];

  this.createView = function(container)
  {
    if (!this.needs_instant_update)
    {
      if (this._render_timeout)
      {
        return;
      }
      else
      {
        var timedelta = Date.now() - this._rendertime;
        if (timedelta < MIN_RENDER_DELAY)
        {
          this._render_timeout = window.setTimeout(this._create_delayed_bound,
                                                   MIN_RENDER_DELAY - timedelta);
          return;
        }
      }
    }    
    this.needs_instant_update = false;

    if (container)
    {
      this._container = container;
      this._container.setAttribute("data-error-log-id", this.id);
      this._container.setAttribute("data-menu", "error-console");
    }
    if (this.query)
    {
      // this triggers _create via on_before_search
      this._text_search.update_search();
    }
    else
    {
      this._create();
    }
  };

  this.create_disabled_view = function(container)
  {
    container.clearAndRender(window.templates.disabled_view());
  };

  this._create_delayed = function()
  {
    this._render_timeout = 0;
    this.createView();
  };

  this._hash_array = function(string, item, index, array)
  {
    return string + "," + item.id;
  }

  this._create = function()
  {
    if (this._container)
    {
      window.error_console_data.set_view_to_use_for_error_count(this.id);
      var entries = window.error_console_data.get_messages(this.query)
                                               .filter(this.source_filter);
      var exceeds_max = false;
      var org_length = entries.length;
      if (org_length > MAX_ENTRIES)
      {
        entries.splice(0, org_length - MAX_ENTRIES);
        exceeds_max = true;
      }

      this.update_error_count(entries);
      var expand_all = settings.console.get('expand-all-entries');

      // when exactly one entry is added since last rendering, render and add only that entry
      var new_entry_hash = entries.slice(0, entries.length - 1).reduce(this._hash_array, "");
      if (
           this._table_ele &&
           this.last_entry_hash &&
           entries.length &&
           new_entry_hash === this.last_entry_hash
         )
      {
        var template = window.templates.errors.log_row(entries.last, 
                                                       expand_all,
                                                       window.error_console_data.get_toggled(),
                                                       this.id);

        this._table_ele.render(template);
      }
      else
      {
        var template = window.templates.errors.log_table(entries, 
                                                       expand_all,
                                                       window.error_console_data.get_toggled(),
                                                       this.id);

        var rendered = this._container.clearAndRender(template);
        this._table_ele = rendered.parentNode.querySelector(".errors-table");
      }
      if (exceeds_max)
        this._container.render(window.templates.errors.exceeds_max(MAX_ENTRIES, org_length));

      this.last_entry_hash = entries.reduce(this._hash_array, "");
      if (this._scrollTop)
      {
        this._container.scrollTop = this._scrollTop;
      }
      this._rendertime = Date.now();
    }
  }

  this.update_error_count = function(entries)
  {
    if (!entries)
    {
      entries = window.error_console_data.get_messages(this.query)
                                           .filter(this.source_filter);
      if (entries.length > MAX_ENTRIES)
        entries.splice(0, entries.length - MAX_ENTRIES);
    }
    window.messages.post("error-count-update", {current_error_count: entries.length});
  }

  this.ondestroy = function()
  {
    this._table_ele = null;
    this._container = null;
    this._rendertime = 0;
    this._render_timeout = 0;
  };

  this._on_before_search = function(message)
  {
    this.query = message.search_term;
    this._create();
  };

  this._init = function(id, name, container_class, source_list, is_blacklist)
  {
    container_class || (container_class = "scroll error-console");
    this.init(id, name, container_class, null, "error-view");
    if (id !== ErrorConsoleView.roughViews[0].id)
    {
      this.fallback_view_id = ErrorConsoleView.roughViews[0].id;
    }
    this._expand_all_state = null;
    this._table_ele = null;
    this._on_before_search_bound = this._on_before_search.bind(this);
    this._create_delayed_bound = this._create_delayed.bind(this);
    this.source_filter = window.error_console_data.make_source_filter(source_list, is_blacklist);
  }
  
}