function(container)
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
        var min_render_delay = Math.max(MIN_RENDER_DELAY, this._last_render_speed * 2);
        if (timedelta < min_render_delay)
        {
          this._render_timeout = window.setTimeout(this._create_delayed_bound,
                                                   min_render_delay - timedelta);
          return;
        }
      }
    }
    this.needs_instant_update = false;
    var started_rendering = Date.now();
    if (container)
      this._container = container;

    // In details, it would be better to not have .network_info and headlines searchable, but those can
    // occur on different levels, so it's too complicated to do with the current script-search.
    // Also searching accross spans (for syntax highlighting) is more important.
    if (this.mode == DETAILS)
      this.text_search.set_query_selector(".entry-details");
    else
      this.text_search.set_query_selector("[handler='select-network-request']");

    var ctx = this._service.get_request_context();
    if (ctx)
    {
      // The filters need to be set when creating the view, the request_context may have changed in between
      ctx.set_filters(this._type_filters || []);
      this._render_main_view(this._container);
      this.text_search.update_search();
    }
    else
    {
      this._render_click_to_fetch_view(this._container);
    }

    var now = Date.now();
    this._last_render_speed = now - started_rendering;
    this._rendertime = now;
  }