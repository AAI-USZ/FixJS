function(container)
  {
    var ctx = this._service.get_resource_context();
    if (ctx && ctx.resources.length)
    {
      if (!this._table)
      {
        this._table = new SortableTable(this._tabledef, null, this._columns, null, null, null, "resources")
      }
      this._table.set_data(ctx.resources.slice(0));
      container.clearAndRender(this._table.render());
      container.scrollTop = this._scrollpos;
    }
    else if (this._loading)
    {
      container.clearAndRender(
        ['div',
         ['p', "Loading page..."],
         'class', 'info-box'
        ]
      );
      this._scrollpos = 0;
    }
    else
    {
      container.clearAndRender(
        ['div',
         ['span',
          'class', 'ui-button',
          'handler', 'reload-window',
          'tabindex', '1'],
         ['p', ui_strings.S_RESOURCE_CLICK_BUTTON_TO_FETCH_RESOURCES],
         'class', 'info-box'
        ]
      );
      this._scrollpos = 0;
    }
  }