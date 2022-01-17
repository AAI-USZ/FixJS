function(id, line)
  {
    var data = {};
    var view = window.views.resource_detail_view; //resource_all;
    if (window.services["resource-manager"] && view)
    {
      if (line)
      {
        var data = {"lines":[line]};
      }
      view.show_resource_for_id(id, data);
    }
  }