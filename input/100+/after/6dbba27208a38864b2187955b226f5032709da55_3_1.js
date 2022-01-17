function(after_render_object, entries)
  {
    var table_template = after_render_object && after_render_object.template;
    var is_data_mode = Boolean(table_template);
    var ctx = this._service.get_request_context();

    // In is_data_mode, the entries have to be retrieved from the table
    // to be in the correct order.
    if (is_data_mode)
      entries = this._table.get_data();

    /*
      hand-calculate network-url-list-container's width, so it only takes one rendering
      #network-url-list-container { width: 40%; min-width: 230px; }
    */
    if (!this._list_cont_width)
    {
      var style_dec = document.styleSheets.getDeclaration("#network-url-list-container");
      this._list_cont_width = parseInt(style_dec.getPropertyValue("width"), 10); // in %
      this._list_cont_min_width = parseInt(style_dec.getPropertyValue("min-width"), 10);
    }
    var url_list_width =
        Math.ceil(Math.max(
                            this._list_cont_min_width,
                            parseInt(this._container.style.width, 10) * this._list_cont_width / 100
                          )
                 );

    var detail_width = parseInt(this._container.style.width, 10) - url_list_width;

    var template = ["div", templates.network.main(
                     ctx, entries, this._selected, detail_width, table_template
                   ), "id", "network-outer-container"];

    if (this._selected)
    {
      var entry = ctx.get_entry_from_filtered(this._selected);
      if (entry)
      {
        // Decide to try to fetch the body, for when content-tracking is off or it's a cached request.
        if (
          entry.is_finished &&
          !entry.called_get_body &&
          (!entry.current_response || !entry.current_response.responsebody) &&
          // When we have a response, but didn't see responsefinished, it means there's really no
          // responsebody. Don't attempt to fetch it.
          (!entry.current_response || entry.current_response.saw_responsefinished)
        )
        {
          this._service.get_body(entry.id, this.update_bound);
        }
        template = [template, this._render_details_view(entry)];
      }
    }

    var rendered = this._container.clearAndRender(template);

    if (this._selected)
    {
      var details = rendered.querySelector(".entry-details");
      if (details)
      {
        if (this._details_scroll_top)
          details.scrollTop = this._details_scroll_top;

        if (this._details_scroll_left)
          details.scrollLeft = this._details_scroll_left;
      }

      if (is_data_mode)
      {
        var sel_row = rendered.querySelector("tr[data-object-id='" + this._selected + "']");
        if (sel_row)
          sel_row.addClass("selected");

      }
    }

    if (this._container_scroll_top)
    {
      var outer_container = rendered.getAttribute("id") === "network-outer-container" ?
                            rendered : rendered.firstChild;
      outer_container.scrollTop = this._container_scroll_top;
    }
  }