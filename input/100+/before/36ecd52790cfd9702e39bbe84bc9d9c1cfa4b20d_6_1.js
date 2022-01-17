function(id, line)
  {
      if (line)
      {
        var data = {"lines":[line]}
      }    
    if (window.services["resource-manager"] && window.views.resource_all)
    {
      var view = window.views.resource_all;
      view.show_resource_for_id(id, data);
    }
  }