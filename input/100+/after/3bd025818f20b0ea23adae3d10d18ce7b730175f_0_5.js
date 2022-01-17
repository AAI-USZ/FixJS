function(status,

                                message,

                                script,

                                line_number,

                                char_offset,

                                box,

                                selection,

                                rt_id,

                                script_text)

  {

    var STATUS = 0;

    var TYPE = 1;

    var VALUE = 2;

    var OBJECT = 3;

    var OBJECT_ID = 0;

    var CLASS_NAME = 4;



    if (status === 0 && message[STATUS] == "completed")

    {

      _identifier = selection;

      _identifier_out_count = 0;

      _update_identifier_boxes(script, _identifier);



      if (selection.start_line != selection.end_line)

      {

        var line_count = selection.start_line - _view.getTopLine();

        if (line_count < 0)

          line_count = 0;



        box.top = _container_box.top + line_count * _line_height;

        var end_line = selection.end_line;

        if (end_line > _view.getBottomLine())

          end_line = _view.getBottomLine();



        line_count = selection.end_line - _view.getTopLine() + 1;

        box.bottom = _container_box.top + line_count * _line_height;

        var max_right = _get_max_right();

        box.left = _total_x_offset;

        box.right = _total_x_offset + max_right - _container.scrollLeft;

      }



      if (message[TYPE] == "object")

      {

        var object = message[OBJECT];

        var model  = new cls.InspectableJSObject(rt_id,

                                                 object[OBJECT_ID],

                                                 "",

                                                 object[CLASS_NAME]);

        _tooltip_model = model;

        model.expand(function()

        {

          var tmpl = ["div",

                       ["h2", templates.default_filter(_filter_config),

                              ["span", object[CLASS_NAME],

                                       "data-tooltip", TOOLTIP_NAME],

                              "data-id", String(model.id),

                              "obj-id", String(model.object_id),

                              "class", "js-tooltip-title"],

                       ["div", [window.templates.inspected_js_object(model, false)],

                               "class", "js-tooltip-examine-container mono"],

                       "class", "js-tooltip js-tooltip-examine"];

          var ele = _tooltip.show(tmpl, box);

          if (ele)

          {

            _filter_input = ele.querySelector("input");

            _tooltip_container = ele.querySelector(".js-tooltip-examine-container");

            _filter.set_form_input(_filter_input);

            _filter.set_container(_tooltip_container);

          }

        });

      }

      else

      {

        var value = "";

        if (message[TYPE] == "null" || message[TYPE] == "undefined")

          value = message[TYPE]

        else if (message[TYPE] == "string")

          value = "\"" + message[VALUE] + "\"";

        else

          value = message[VALUE];



        var tmpl = ["div",

                     ["value", value, "class", message[TYPE]],

                     "class", "js-tooltip"];

        _tooltip.show(tmpl, box);

      }



      var start_line = _identifier.start_line;

      var start_offset = _identifier.start_offset;

      var length = script_text.length;



      if (start_line < _view.getTopLine())

      {

        if (_identifier.end_line < _view.getTopLine())

          return;



        start_line = _view.getTopLine();

        start_offset = 0;

        var start = script.line_arr[start_line - 1];

        var end = script.line_arr[selection.end_line - 1] + selection.end_offset;

        length = end + 1 - start;

      }



      if (!_win_selection.isCollapsed)

        _win_selection.collapseToStart()



      _view.higlight_slice(start_line, start_offset, length);

    }

  }