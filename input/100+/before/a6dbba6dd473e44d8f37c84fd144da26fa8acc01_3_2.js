function(id, name, container_class)

{

  this.createView = function(container)

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

  };



  this._create_view = function(return_values)

  {

    this._container.clearAndRender(templates.return_values(return_values, this._search_term));

  };



  this._return_values_no_content = function()

  {

    return (

      ["div",

         "No return values",

       "class", "not-content inspection"

      ]

    );

  };



  this.onbeforesearch = function(msg)

  {

    if (this._create_view_bound && this.isvisible())

    {

      this._search_term = msg.search_term;

      this._create_view_bound();

    }

  }.bind(this);



  this._init = function(id, name, container_class)

  {

    View.prototype.init.call(this, id, name, container_class);

    this.required_services = ["ecmascript-debugger"];

    this._container = null;

    this._models = [];

    this._search_term = "";

  };



  this._init(id, name, container_class);

}