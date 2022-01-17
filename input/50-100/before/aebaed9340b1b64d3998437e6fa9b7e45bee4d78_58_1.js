function(button_templates, group, view_id)
  {
    var ret = ["toolbar-buttons", button_templates];
    if (group.type)  // single-select or switch
    {
      ret.push("handler", "toolbar-" + group.type);
      if (group.type === "single-select")
      {
        ret = ret.concat(["data-single-select-name", group.name,
                          "data-view-id", view_id]);
      }
    }
    return ret;
  }