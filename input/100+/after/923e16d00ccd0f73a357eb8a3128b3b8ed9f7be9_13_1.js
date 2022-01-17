function(container)
  {
    // TODO this must be refactored
    // the challenge is to do as less as possible in the right moment
    view_invalid = view_invalid
    && __current_script.script_id
    && runtimes.getSelectedScript()
    && runtimes.getSelectedScript() != __current_script.script_id
    || !runtimes.getSelectedScript();
    if( view_invalid )
    {
      __current_script = {};
      __top_line = 0;
    }
    __container = container;
    frame_id = container.id;
    container.innerHTML = "" +
      "<div id='js-source-scroll-content'>"+
        "<div id='js-source-content' " +
             "class='js-source' " +
             "data-menu='js-source-content' " +
             "data-tooltip='" + cls.JSSourceTooltip.tooltip_name + "'></div>"+
      "</div>"+
      "<div id='js-source-scroll-container' handler='scroll-js-source'>"+
        "<div id='js-source-scroller'></div>"+
      "</div>";
    if (!context['line-height'])
    {
      this._set_style();
    }
    context['container-height'] = parseInt(container.style.height);
    var set = null, i = 0;
    source_content = document.getElementById(container_id);
    if(source_content)
    {
      if (document.getElementById(scroll_container_id))
      {
        document.getElementById(scroll_container_id).onscroll = this.scroll;
      }
      __max_lines = context['container-height'] / context['line-height'] >> 0;
      var lines = document.getElementById(container_line_nr_id);
      if( lines )
      {
        lines.parentElement.removeChild(lines);
      }
      container.render(templates.line_nummer_container(__max_lines || 1));
      line_numbers = document.getElementById(container_line_nr_id);

      var selected_script_id = runtimes.getSelectedScript();
      if(selected_script_id && selected_script_id != __current_script.script_id)
      {
        var stop_at = runtimes.getStoppedAt(selected_script_id);
        if(stop_at && stop_at[0])
        {
          var line = parseInt(stop_at[0].line_number);
          this.showLine(selected_script_id, line);
          this.showLinePointer(__top_line, true);
        }
        else
        {
          this.showLine(selected_script_id, 0);
        }
      }
      else if(__current_script.script_id)
      {
        setScriptContext(__current_script.script_id, __top_line);
        this.showLine(__current_script.script_id, __top_line);
      }
      else
      {
        updateLineNumbers(0);
        if(runtimes.getSelectedRuntimeId())
        {
          document.getElementById(scroll_content_id).render(
              runtimes.isReloadedWindow(runtimes.getActiveWindowId()) ?
              ['div',
                ['p', ui_strings.S_INFO_RUNTIME_HAS_NO_SCRIPTS],
                'class', 'info-box'
              ] :
              ['div',
                ['span',
                  'class', 'ui-button reload-window',
                  'handler', 'reload-window',
                  'tabindex', '1'],
                ['p', ui_strings.S_INFO_RELOAD_FOR_SCRIPT],
                'class', 'info-box'
              ]
            );
        }
        else
        {
          document.getElementById(scroll_content_id).render(
              ['div',
                ['p', ui_strings.S_INFO_WINDOW_HAS_NO_RUNTIME],
                'class', 'info-box'
              ]
            );
        }
      }

    }
  }