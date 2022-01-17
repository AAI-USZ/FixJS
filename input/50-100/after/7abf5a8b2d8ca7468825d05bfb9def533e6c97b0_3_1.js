function(id, line)
  {
    var foo = this._check(line);
    if (foo){ foo.view.show_resource_for_id(id, foo.data); }
/*
    var data = this._get_data(line);
    var view = window.views.resource_detail_view; //resource_all;
    if (window.services["resource-manager"] && view)
    {
      view.show_resource_for_id(id, data);
    }
*/
  }