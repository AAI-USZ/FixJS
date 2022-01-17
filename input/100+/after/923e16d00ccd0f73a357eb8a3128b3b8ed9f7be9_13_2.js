function(id, name, container_class)
{
  // TODO this view can just be visible once at the time otherwise there will be problems
  // this must be refactored. line_arr, state_arr, breakpoints must be added to the script object
  // getting context values must move out of this class
  // split out one general class to handle partial view ( yield count of lines )

  var self = this;
  var frame_id = 'js-source';
  var container_id = 'js-source-content';
  var container_line_nr_id = 'js-source-line-numbers';
  var scroll_id = 'js-source-scroller';
  var scroll_content_id = 'js-source-scroll-content';
  var scroll_container_id = 'js-source-scroll-container';
  var container_breakpoints_id = 'break-point-container';

  const STOP_AT_ERROR_CLASS = "stop-at-error";
  const ERROR_TOOLTIP_CLASS = "error-description";

  var context = {};

  var __current_script = {};

  var source_content = null;

  var line_numbers = null;

  var __top_line = 0;
  var __max_lines = 0;

  var __current_pointer_script_id = 0;

  var __view_is_destroyed = true;
  var __disregard_scroll_event = false;

  var __timeoutUpdateLayout = 0;

  var templates = {};

  var __timeout_clear_view = 0;
  var __container = null;
  var view_invalid = true;

  const
  LINE_POINTER_TOP = window.cls.NewScript.LINE_POINTER_TOP,
  LINE_POINTER = window.cls.NewScript.LINE_POINTER,
  LINE_MIN_CONTEXT_SIZE = 3,
  BP_IMAGE_LINE_HEIGHT = 24,
  BP_IMAGE_HEIGHT = 12,

  //TODO Add proper classes names.
  //Add styles for all classes.
  LINE_HIGHLIGHT_CLASSNAMES = ["",
                              "selected-js-source-line",
                              "selected-js-redirected-line"],
  BP_HIGHLIGHT_CLASSNAMES = ["",
                            "selected-js-bp-disabled",
                            "selected-js-bp-disabled-condition",
                            "selected-js-bp",
                            "selected-js-bp-condition"];

  templates.line_nummer_container = function(lines)
  {
    var ret = ['ul'], i = 0;
    for( ; i<lines; i++)
    {
      ret[ret.length] = templates.line_nummer();
    }
    return ret.concat(['id', container_line_nr_id]);
  }

  templates.line_nummer = function()
  {
    return ['li',
      ['input'],
      ['span', 'handler', 'set-break-point'],
    ];
  }

  var updateLineNumbers = function(fromLine)
  {
    var lines = line_numbers.getElementsByTagName('input'), line = null, i=0;
    var breakpoints = line_numbers.getElementsByTagName('span');
    if (__current_script.line_arr)
    {
      for (; line = lines[i]; i++)
      {
        line.value = fromLine++;
      }
      updateBreakpoints();
    }
    else
    {
      lines[0].value = 1;
    }
  }

  var clearLineNumbers = function()
  {
    var lines = line_numbers.getElementsByTagName('input');
    var breakpoints = line_numbers.getElementsByTagName('span');

    for (var i = 0, line; line = lines[i]; i++)
    {
      if (i == 0)
      {
        line.value = '1';
      }
      else
      {
        line.value = '';
      }
      // workaround crash bug
      //breakpoints[i].style.removeProperty('background-position');
      breakpoints[i].style.backgroundPosition = '0 0';
    }
  }

  var updateBreakpoints = function(force_repaint)
  {
    if (force_repaint && line_numbers)
    {
      line_numbers.style.visibility = "hidden";
    }
    var lines = line_numbers && line_numbers.getElementsByTagName('span');
    var bp_states = __current_script && __current_script.breakpoint_states;
    var default_y = context['bp-line-pointer-default'];
    var line_height = context['line-height'];
    if (bp_states)
    {
      for (var i = 0, line, y; line = lines[i]; i++)
      {
        if (bp_states[__top_line + i])
        {
          y = default_y - 1 * bp_states[__top_line + i] * BP_IMAGE_LINE_HEIGHT;
          line.style.backgroundPosition = '0 ' + y + 'px';
        }
        else
        {
          line.style.backgroundPosition = '0 0';
        }
      }
    }
    if (force_repaint)
    {
      setTimeout(repaint_line_numbers, 0);
    }
    addLineHighlight();
  };

  var addLineHighlight = function()
  {
    if (source_content && __current_script)
    {
      var lines = source_content.getElementsByTagName('div');
      var bp_states = __current_script.breakpoint_states;
      if (bp_states)
      {
        var highlight_class, bp_state;
        for (var i = 0, line; line = lines[i]; i++)
        {
          if (line.parentNode != source_content)
          {
            continue;
          }
          highlight_class = "";

          if (bp_state = bp_states[__top_line + i])
          {
            highlight_class = (LINE_HIGHLIGHT_CLASSNAMES[bp_state % 3] + " " +
                              BP_HIGHLIGHT_CLASSNAMES[bp_state >> 3]);
          }
          if (line.className.indexOf('error') > -1)
          {
            line.className = Array.prototype.filter.call(line.classList, 
                                                         function(cl_name)
            {
              return cl_name.indexOf('error') > -1;
            }).join(' ') + ' ' + highlight_class;
          }
          else
          {
            line.className = highlight_class;
          }
        }
      }
    }
  };

  var repaint_line_numbers = function()
  {
    if (line_numbers)
    {
      line_numbers.style.visibility = "visible";
    }
  };

  this._set_style = function()
  {
    context['line-height'] = defaults['js-source-line-height'];
    context['scrollbar-width'] = defaults['scrollbar-width'];
    context['bp-line-pointer-default'] =
      (defaults['js-source-line-height'] - BP_IMAGE_HEIGHT) / 2 >> 0;
    var style = null;
    var sheets = document.styleSheets;
    if (style = sheets.getDeclaration('#js-source-scroll-container'))
    {
      style.width = defaults['scrollbar-width'] + 'px';
    }
    if (style = sheets.getDeclaration('#js-source-content div'))
    {
      style.lineHeight = style.height = context['line-height'] + 'px';
    }
    if (style = sheets.getDeclaration('#js-source-line-numbers li'))
    {
      style.height = context['line-height'] + 'px';
    }
  }

  this.createView = function(container)
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

  this.create_disabled_view = function(container)
  {
    container.clearAndRender(window.templates.disabled_view());
  };

  this.onresize = function(container)
  {
    // optimization - having no line wrapping allows to optimize out width-only changes
    if(this.isvisible() && context['container-height'] != parseInt(container.style.height))
    {
      __view_is_destroyed = true;
      this.createView(container);
      messages.post('view-created', {id: this.id, container: container});
    }
  }

  var updateLayout = function()
  {
    // not used
    if( source_content && source_content.innerHTML )
    {
      source_content.innerHTML = '';
    }
    if( !__timeoutUpdateLayout )
    {
      __timeoutUpdateLayout = setTimeout(__updateLayout, 60);
    }
  }

  var __updateLayout = function()
  {
    if( __current_script.line_arr )
    {
      self.setup();
      setScriptContext(__current_script.script_id, __top_line);
      self.showLine(__current_script.script_id, __top_line);
    }
    else
    {
      self.setup(1);
    }
    __timeoutUpdateLayout = 0;
  }

  var getMaxLengthLineIndex = function()
  {
    var i = 0,
      max = 0,
      max_index = 0,
      previous = 0,
      line_arr = __current_script.line_arr,
      length = line_arr.length;
    for ( ; i < length; i++)
    {
      if ((line_arr[i] - previous) > max)
      {
        max = line_arr[i] - previous;
        max_index = i;
      }
      previous = line_arr[i];
    }
    return max_index;
  }

  var updateScriptContext = function()
  {
    if (__current_script.scroll_width &&
        __current_script.scroll_width > source_content.offsetWidth)
    {
      document.getElementById(scroll_container_id).style.bottom =
          context['scrollbar-width'] + 'px';
      source_content.style.minWidth = __current_script.scroll_width +'px';
    }
    else
    {
      document.getElementById(scroll_container_id).style.removeProperty('bottom');
      source_content.style.removeProperty('min-width');
    }
    document.getElementById(scroll_id).style.height = __current_script.scroll_height + 'px';
    if (__current_script.scroll_height > context['line-height'] * __max_lines)
    {
      document.getElementById(scroll_content_id).style.right =
        context['scrollbar-width'] + 'px';
    }
    else
    {
      document.getElementById(scroll_content_id).style.right = '0px';
    }
  }

  var setScriptContext = function(script_id, line_no)
  {
    source_content.innerHTML = "<div style='visibility:hidden'>" +
      simple_js_parser.format(__current_script, getMaxLengthLineIndex() - 1, 1).join('') + "</div>";
    var scrollWidth = __current_script.scroll_width = document.getElementById(scroll_content_id).scrollWidth;
    var offsetWidth = document.getElementById(scroll_content_id).offsetWidth;
    // ensure that a scrollbar is also displayed with very long one-liner scripts
    // max width which produces a scrollbar is 0x7FFF - 1
    if(__current_script.scroll_width > 0x7FFE)
    {
      __current_script.scroll_width = 0x7FFE;
    }
    if (scrollWidth > offsetWidth)
    {
      __max_lines =
        (context['container-height'] - context['scrollbar-width']) / context['line-height'] >> 0;
    }
    else
    {
      __max_lines = context['container-height'] / context['line-height'] >> 0;
    }
    if (__max_lines > __current_script.line_arr.length)
    {
      __max_lines = __current_script.line_arr.length;
    }
    var lines = document.getElementById(container_line_nr_id);

    if (lines)
    {
      lines.parentElement.removeChild(lines);
    }
    document.getElementById(frame_id).render(templates.line_nummer_container(__max_lines));
    line_numbers = document.getElementById(container_line_nr_id);
    source_content.style.height = (context['line-height'] * __max_lines) +'px';
    __current_script.scroll_height = __current_script.line_arr.length * context['line-height'];
    updateScriptContext();
    source_content.innerHTML = "";
    return true;
  }

  var clearScriptContext = function()
  {
    __max_lines = 1;
    document.getElementById(scroll_container_id).style.removeProperty('bottom');
    source_content.style.removeProperty('width');
    var lines = document.getElementById(container_line_nr_id);
    lines.parentElement.removeChild(lines);
    document.getElementById(frame_id).render(templates.line_nummer_container(__max_lines));
    document.getElementById(scroll_id).style.height = 'auto';
    document.getElementById(scroll_content_id).style.right = '0px';
  }

  // deprecated. use this.show_and_flash_line instead.
  this.highlight = function(script_id, line_no, highlight_line_start, highlight_line_end)
  {
    if (this.isvisible())
    {
      this.show_and_flash_line(script_id, line_no);
    }
  }

  this.show_and_flash_line = function(script_id, line_no)
  {
    this.showLine(script_id, line_no);
    var line = this.get_line_element(line_no);
    if (line && typeof line_no == "number")
    {
      line.addClass('selected-js-source-line');
      setTimeout(function(){line.removeClass('selected-js-source-line')}, 800);
    }
  }

  this.get_line_element = function(line_no)
  {
    var source_content = document.getElementById(container_id);
    var lines = source_content &&
                source_content.querySelectorAll("div:not(.error-description)");
    var line = typeof line_no == "number" && lines && lines[line_no - __top_line];
    return line;
  }

  this.get_scroll_container = function()
  {
    return document.getElementById(scroll_content_id);
  }

  /**
    * Generate and show lines of the script.
    *
    * @param script_id Id of the script.
    * @param line_no Line number of the line that should be made visible.
    *        In case of scrolling the view, requested line will correspond with
    *        the top of the view. In other cases line will be displayed in what
    *        will be the most appropriate way (for example centered in the view).
    * @param is_parse_error Flag indicating that script triggered a parsing error.
    * @param is_scroll Flag indicating that method was invoked with the intent
    *        of scrolling the view.
    *
    * @return boolean for the visibility of this view.
    */
  this.showLine = function(script_id, line_no, is_parse_error, is_scroll)
  {
    if (__timeout_clear_view)
    {
      __timeout_clear_view = clearTimeout(__timeout_clear_view);
    }

    var is_visible = (source_content = document.getElementById(container_id)) ? true : false;
    // if the view is visible it shows the first new script
    // before any parse error, that means in case of a parse error
    // the current script has not set the parse_error property
    if (__current_script.parse_error)
    {
      is_parse_error = true;
    }
    var is_current_script = __current_script.script_id == script_id;
    if (!is_current_script || is_parse_error)
    {
      var script_obj = runtimes.getScript(script_id);

      if (script_obj)
      {
        if (!script_obj.line_arr)
        {
          script_obj.set_line_states();
        }
        __current_script = script_obj;
        if (script_obj.parse_error)
        {
          var error_line = 0;
          while(error_line < script_obj.line_arr.length &&
              script_obj.line_arr[error_line] < script_obj.parse_error.offset)
          {
            error_line++;
          }
          script_obj.parse_error.error_line = error_line - 1;
          script_obj.parse_error.error_line_offset =
            script_obj.parse_error.offset - script_obj.line_arr[error_line - 1];
        }
        if (is_visible && !is_current_script)
        {
          setScriptContext(script_id, line_no);
        }
        messages.post('script-selected', {script_id: script_id});
        runtimes.setSelectedScript(script_id);
      }
      else
      {
        document.getElementById(scroll_id).innerHTML = "";
        if (typeof script_id == "number" && !isNaN(script_id) &&
            typeof line_no == "number"  && !isNaN(line_no))
        {
          new ConfirmDialog(ui_strings.D_RELOAD_SCRIPTS,
                            function(){ runtimes.reloadWindow(); }).show();
        }
        else
        {
          opera.postError(ui_strings.S_DRAGONFLY_INFO_MESSAGE +
                          "script source is missing for given id " +
                          "in views.js_source.showLine");
        }
        return;
      }
      // reset the stored current line to ensure
      // that the view gets updated in the next block
      __top_line = 0;
    }
    if (line_no < 1)
    {
      line_no = 1;
    }

    if (is_visible)
    {
      if (!__current_script.scroll_width)
      {
        setScriptContext(script_id, line_no);
      }
      if (view_invalid)
      {
        updateScriptContext();
      }

      var is_line_in_view = this._is_line_within_view(line_no)
                          // show LINE_MIN_CONTEXT_SIZE lines of context after specified line
                          && line_no < (this.getBottomLine() - LINE_MIN_CONTEXT_SIZE);
      if (!is_line_in_view || __view_is_destroyed || !source_content.innerHTML || is_scroll)
      {
        __top_line = line_no;

        // line should not be modified when scrolling
        if (!is_scroll)
        {
          // show at least LINE_MIN_CONTEXT_SIZE lines of context before specified line
          __top_line = Math.max(1, line_no - LINE_MIN_CONTEXT_SIZE);
          // when at the end of the script, align with the bottom of the view
          __top_line = Math.max(1, Math.min(__top_line, __current_script.line_arr.length - __max_lines));
        }

        source_content.innerHTML = get_script_lines(__top_line, this.getMaxLines() - 1);
        updateLineNumbers(__top_line);

        if (__current_script.stop_at_error)
          this.show_stop_at_error();

        var scroll_container = document.getElementById(scroll_container_id);
        if(scroll_container)
        {
          __disregard_scroll_event = true;
          // setting scrollTop will trigger a scroll event
          scroll_container.scrollTop =
            __top_line / __current_script.line_arr.length * scroll_container.scrollHeight;
        }

        __view_is_destroyed = false;
      }
    }
    view_invalid = false;

    if (is_scroll)
    {
      messages.post
      (
        'view-scrolled',
        {
          id: this.id,
          top_line: this.getTopLine(),
          bottom_line: this.getBottomLine()
        }
      );
    }

    return is_visible;
  }

  var get_script_lines = function(from_line, lines_num)
  {
    return simple_js_parser.format(__current_script,
                                   from_line - 1,
                                   lines_num).join('');
  }

  this._is_line_within_view = function(line_no)
  {
    return __top_line && line_no >= __top_line && line_no < (__top_line + __max_lines);
  }

  this.getTopLine = function()
  {
    return __top_line;
  }

  this.getMaxLines = function()
  {
    return __max_lines;
  }

  this.getBottomLine = function()
  {
    return __top_line + __max_lines;
  }

  /* first allays use showLine */
  this.showLinePointer = function(line, is_top_frame)
  {
    this._clear_line_pointer(false);
    var bp_states = __current_script && __current_script.breakpoint_states;
    if (bp_states)
    {
      __current_pointer_script_id = __current_script.script_id;
      __current_script.line_pointer.line = line;
      __current_script.line_pointer.state = is_top_frame ?
                                            LINE_POINTER_TOP :
                                            LINE_POINTER;
      if (!bp_states[line])
      {
        bp_states[line] = 0;
      }
      bp_states[line] += __current_script.line_pointer.state;
    }

    updateBreakpoints();
  };

  this.clearLinePointer = function(do_not_update)
  {
    this._clear_line_pointer();
    if (do_not_update !== false)
    {
      updateBreakpoints();
    }
  };

  this._clear_line_pointer = function()
  {
    if (__current_pointer_script_id)
    {
      var p_s = window.runtimes.getScript(__current_pointer_script_id);
      if (p_s)
      {
        p_s.breakpoint_states[p_s.line_pointer.line] -= p_s.line_pointer.state;
        p_s.line_pointer.line = 0;
        p_s.line_pointer.state = 0;
      }
      __current_pointer_script_id = 0;
    }
  };

  this.getCurrentScriptId = function()
  {
    return __current_script && __current_script.script_id;
  }

  this.get_current_script = function()
  {
    return runtimes.getScript(this.getCurrentScriptId());
  };

  this.get_line_number_with_offset = function(offset)
  {
    if (__current_script && __current_script.script_id)
    {
      var cand = __top_line + Math.floor(offset / context["line-height"]);
      if (cand <= __current_script.line_arr.length)
        return cand;
    }
    return -1;
  };

  this.higlight_slice = function(line_number, offset_start, length, style)
  {
    if (__current_script && __current_script.script_id)
    {
      this._slice_highlighter.clear_hit();
      var line_ele = this.get_line_element(line_number);
      while (line_ele && typeof length == "number" && !isNaN(length) && length > 0)
      {
        this._slice_highlighter.set_hit(line_ele, 
                                        offset_start,
                                        length, 
                                        TextSearch.HIGHLIGHT_STYLE,
                                        true,
                                        ".error-description");
        length -= __current_script.get_line_length(line_number) - offset_start;
        offset_start = 0;
        line_number++;
        line_ele = line_ele.nextElementSibling;
      }
    }
  };

  this.show_stop_at_error = function()
  {
    if (__current_script &&
        __current_script.stop_at_error &&
        this._is_line_within_view(__current_script.stop_at_error.line_number))
    {
      var error = __current_script.stop_at_error;
      var line_ele = this.get_line_element(error.line_number);
      if (line_ele)
      {
        line_ele.className = STOP_AT_ERROR_CLASS;
        var tmpl = ['div',
                    'Unhandled ' + error.error_class + ': ' + error.error_message,
                    'class', ERROR_TOOLTIP_CLASS];
        if (line_ele.firstChild)
          line_ele.insertBefore(document.render(tmpl), line_ele.firstChild);
        else
          line_ele.render(tmpl);
      }
    }
  };

  this.clear_stop_at_error = function()
  {
    var source_content = document.getElementById(container_id);
    var tooltip = source_content &&
                  source_content.querySelector("." + ERROR_TOOLTIP_CLASS);

    if (tooltip)
    {
      tooltip.parentNode.removeClass(STOP_AT_ERROR_CLASS);
      tooltip.parentNode.removeChild(tooltip);
    }
  };

  this.clearView = function()
  {
    if( !__timeout_clear_view )
    {
      __timeout_clear_view = setTimeout( __clearView, 100);
    }
  }

  var __clearView = function()
  {
    if( ( source_content = document.getElementById(container_id) ) && source_content.parentElement )
    {
      var
      divs = source_content.parentElement.parentElement.getElementsByTagName('div'),
      div = null,
      i = 0;

      source_content.innerHTML = '';
      for( ; div = divs[i]; i++)
      {
        div.removeAttribute('style');
      }
      clearLineNumbers();
    }
    __current_script = {};
    self.clearLinePointer();
    __top_line = 0;
    __timeout_clear_view = 0;
    view_invalid = true;
    __view_is_destroyed = true;
    runtimes.setSelectedScript(-1);
  }

  var onRuntimeDestroyed = function(msg)
  {
    // TODO this is not good, clean up the the local __current_script
    if( __current_script && runtimes.getRuntimeIdWithScriptId(__current_script.script_id) == msg.id )
    {
      __clearView();
    }
  }

  this.ondestroy = function()
  {
    // keep any state about the script currently displayed
    __view_is_destroyed = true;
  }


  /* action broker interface */

  /**
    * To handle a single action.
    * Returning false (as in === false) will cancel the event
    * (preventDefault and stopPropagation),
    * true will pass it to the next level if any.
    * @param {String} action_id
    * @param {Event} event
    * @param {Element} target
    */
  this.handle = function(action_id, event, target){};

  /**
    * To get a list of supported actions.
    */
  this.get_action_list = function(){};

  /**
    * Gets called if an action handler changes to be the current context.
    */
  this.focus = function(container){};

  /**
    * Gets called if an action handle stops to be the current context.
    */
  this.blur = function(){};

  /**
    * Gets called if an action handler is the current context.
    * Returning false (as in === false) will cancel the event
    * (preventDefault and stopPropagation),
    * true will pass it to the next level if any.
    */
  this.onclick = function(event){};

  this.handle = function(action_id, event, target)
  {
    if (action_id in this._handlers)
      return this._handlers[action_id](event, target);
  }

  this.get_action_list = function()
  {
    var actions = [], key = '';
    for (key in this._handlers)
      actions.push(key);
    return actions;
  };

  this.mode = "default";

  this._handlers = {};

  this.mode_labels =
  {
    "default": ui_strings.S_LABEL_KEYBOARDCONFIG_MODE_DEFAULT,
  }

  const PAGE_SCROLL = 20;
  const ARROW_SCROLL = 2;

  this.scroll = function()
  {
    if (!view_invalid && !__disregard_scroll_event)
    {
      var top = document.getElementById(scroll_container_id).scrollTop;
      var target_line = Math.ceil(top / context['line-height']);
      if (__top_line != target_line)
      {
        self.showLine(__current_script.script_id, target_line, false, true);
      }
    }
    __disregard_scroll_event = false;
  }

  this._scroll_lines = function(lines, event, target)
  {
    if (__current_script && __current_script.line_arr)
    {
      var target_line = Math.max(1, Math.min(__top_line + lines,
                                             __current_script.line_arr.length - __max_lines));
      if (__top_line != target_line)
      {
        this.showLine(__current_script.script_id, target_line, false, true);
      }
    }
    return false;
  }

  this._onbreakpointupdated = function(msg)
  {
    if (__current_script && __current_script.script_id == msg.script_id)
    {
      updateBreakpoints();
    }
  };

  this._onmonospacefontchange = function(msg)
  {
    this._set_style();
    if (this.isvisible() && __container)
    {
      __view_is_destroyed = true;
      this.createView(__container);
    }
  };

  this._on_setting_change = function(msg)
  {
    if (msg.id == this.id && msg.key == "show-js-tooltip")
      this.handle_tooltip_setting();
  }

  this.handle_tooltip_setting = function()
  {
    if (window.settings.js_source.get("show-js-tooltip"))
    {
      if (!this._tooltip)
        this._tooltip = new cls.JSSourceTooltip(this);
    }
    else
    {
      if (this._tooltip)
        this._tooltip.unregister();

      this._tooltip = null;
    } 
  };

  eventHandlers.mousewheel['scroll-js-source-view'] = function(event, target)
  {
    this._scroll_lines((event.detail > 0 ? 1 : -1) * 3 , event, target);
  }.bind(this);

  this._handlers['show-window-go-to-line'] = function(event, target)
  {
    UIWindowBase.showWindow(this._go_to_line.id,
                            this._go_to_line.window_top,
                            this._go_to_line.window_left,
                            this._go_to_line.window_width,
                            this._go_to_line.window_height);
    return false;
  }.bind(this);
  
  this.required_services = ["ecmascript-debugger"];
  this._handlers["scroll-page-up"] = this._scroll_lines.bind(this, -PAGE_SCROLL);
  this._handlers["scroll-page-down"] = this._scroll_lines.bind(this, PAGE_SCROLL);
  this._handlers["scroll-arrow-up"] = this._scroll_lines.bind(this, -ARROW_SCROLL);
  this._handlers["scroll-arrow-down"] = this._scroll_lines.bind(this, ARROW_SCROLL);
  this.init(id, name, container_class, null, "scroll-js-source-view");
  this._go_to_line = new cls.GoToLine(this);
  messages.addListener("update-layout", updateLayout);
  messages.addListener("runtime-destroyed", onRuntimeDestroyed);
  messages.addListener("breakpoint-updated", this._onbreakpointupdated.bind(this));
  messages.addListener("monospace-font-changed",
                       this._onmonospacefontchange.bind(this));
  messages.addListener("setting-changed", this._on_setting_change.bind(this));

  ActionBroker.get_instance().register_handler(this);

  var config =
  {
    "css_classes":
    {
      "selected_match_class": "js-identifier-selected",
      "selected_match_class_first": "js-identifier-selected-first",
      "selected_match_class_between": "js-identifier-selected-between",
      "selected_match_class_last": "js-identifier-selected-last" 
    }
  }

  this._slice_highlighter = new VirtualTextSearch(config);
  this._tooltip = null;

}