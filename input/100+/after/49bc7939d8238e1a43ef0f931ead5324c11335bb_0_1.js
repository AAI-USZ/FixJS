function(dummy, parent_div, viewbox) {
    var div;

    if(parent_div)
      div=parent_div.child_divs[this.id];
    else
      div=root_div;

    if((!div)||(!div.open))
      return;

    var list={};
    var viewbox=get_viewbox();

    for(var i=0; i<this.sub_categories.length; i++) {
      this.sub_categories[i].shall_reload(list, div.sub, viewbox);
    }

    if(!keys(list).length)
      return;

    var param={};
    param.viewbox=get_viewbox();
    param.zoom=get_zoom();
    param.category=keys(list).join(",");
    param.count=10;

    if(category_request) {
      category_request.abort();
    }

    category_request=ajax_direct("list.php", param, this.request_data_callback.bind(this));
  }