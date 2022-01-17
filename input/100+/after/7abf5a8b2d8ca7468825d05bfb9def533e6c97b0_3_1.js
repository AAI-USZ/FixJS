function(line)
  {
    var data = {};
    var manager = window.services["resource-manager"];
    var view = window.views.resource_detail_view;
    if (line){ data.lines=[line]; }
    if (manager && view){ return {view:view,data:data}; }
    return null;
  }