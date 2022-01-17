function(target) {
    // check if data is already there
    if($(target).data("linked_items_loaded") == undefined || $(target).data("items_loaded") == undefined || $(target).data("widget") == undefined) {
      return false;
    }
    // remove start loading indicator
    $(target).data("widget").find(".loading").remove();
    // data
    var items = _.map($(target).data("items"), function(item){
      item.meta_data = MetaDatum.flatten(item.meta_data);
      return item;
    });
    var widget = $(target).data("widget");
    // templating
    $(widget).append($.tmpl("tmpl/widgets/_search"));
    $(widget).append($.tmpl("tmpl/widgets/_list", {items: items}));
    $(widget).append($.tmpl("tmpl/widgets/_new"));
    $(widget).append($.tmpl("tmpl/widgets/_actions"));
    
    // setup the rest
    SetWidget.setup_list(target);
    SetWidget.focus_input(target);
    SetWidget.setup_search_field(target);
    SetWidget.setup_search_hint(target);
    SetWidget.setup_cancel(target);
    SetWidget.setup_create_new(target);
    SetWidget.setup_create_hint(target);
    SetWidget.setup_selection_actions(target, $(".list ul li input[type=checkbox]"));
    SetWidget.setup_submit(target);
  }