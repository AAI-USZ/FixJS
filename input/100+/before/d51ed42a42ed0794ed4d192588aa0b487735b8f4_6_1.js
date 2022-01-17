function(id, name, container_class)

{



  /* settings */

  this.window_top = 40;

  this.window_left = 40;

  this.window_width = 300;

  this.window_height = 300;

  this.window_statusbar = false;

  this._container = null;

  this.requierd_services = ["ecmascript-debugger"];



  this.createView = function(container)

  {

    this._container = container;

    container.clearAndRender(window.templates.ev_brp_config(window.event_breakpoints.get_events()));

  }



  this.show_filtered_view = function(filter_str)

  {

    if (this._container && this.isvisible())

    {

      filter_str = filter_str.toLowerCase();

      const NAME = 0, CHECKED = 1;

      var events = window.event_breakpoints.get_events();

      var event_list = null;

      var filter = function(event)

      {

        return event[NAME].toLowerCase().indexOf(filter_str) > -1;

      };



      if (filter_str)

      {

        events = events.map(function(section, index)

        {

          event_list = section.events.filter(filter);

          return (

          {

            title: section.title,

            spec: section.spec,

            events: event_list,

            is_unfolded: Boolean(event_list.length),

            is_search: true

          });

        });

      }

      this._container.clearAndRender(window.templates.ev_brp_config(events));

    }

  }



  this.ondestroy = function()

  {

    this._container = null;

  }



  this.init(id, name, container_class);

}