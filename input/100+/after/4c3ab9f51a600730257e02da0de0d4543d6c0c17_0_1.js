function(container)

  {

    this._container = container;

    if (this._create_view_bound)

    {

      this._create_view_bound();

      return;

    }

    var return_values = stop_at.get_return_values();

    var return_value_list = return_values && return_values.return_value_list;

    if (return_value_list && return_value_list.length)

    {

      return_value_list.forEach(function(retval)

      {

        var object = retval.value.object;

        if (object)

        {

          var name = object.className === "Function" && !object.functionName

                   ? ui_strings.S_ANONYMOUS_FUNCTION_NAME

                   : object.functionName;

          retval.value.model = new cls.InspectableJSObject(return_values.rt_id,

                                                           object.objectID,

                                                           name,

                                                           object.className);

        }

      });

      this._create_view_bound = this._create_view.bind(this, return_values);

      this._create_view_bound();

    }

    else

    {

      this._create_view_bound = null;

      container.clearAndRender(this._return_values_no_content());

    }

  }