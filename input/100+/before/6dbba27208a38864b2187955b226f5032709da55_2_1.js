function(context, index, all_contexts)
{
  if (context.incomplete_warn_discarded ||
      context.saw_main_document_abouttoloaddocument)
  {
    return [];
  }
  
  // Only add the title if there's more than one context in total
  var title = "";
  if (all_contexts.length > 1)
  {
    var win = window.window_manager_data.get_window(context.id);
    title = win && (" - " + win.title);
  }

  return ["div",
           ["div",
             ["span",
               "class", "ui-button reload-window",
               "handler", "reload-window",
               "tabindex", "1"
             ]
           ],
           ["p",
             ui_strings.S_HTTP_INCOMPLETE_LOADING_GRAPH + title
           ],
           ["span",
             " ",
             "class", "close_incomplete_warning",
             "handler", "close-incomplete-warning",
             "tabindex", "1"
           ],
           "class", "info-box network_incomplete_warning",
           "data-reload-window-id", String(context.id)
         ];
}