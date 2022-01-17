function(select_id, runtimes, stopped_script_id,
                                          selected_script_id, search_term)
  {
    var script_list = ["div"];
    if (runtimes && runtimes.length)
    {
      for (var i = 0, rt; rt = runtimes[i]; i++)
      {
        script_list.push(this.runtime_script(rt, stopped_script_id, 
                                             selected_script_id, search_term));
      }
    }
    script_list.push("class", "js-dd-script-list",
                     "handler", "js-dd-move-highlight");
    return script_list;
  }