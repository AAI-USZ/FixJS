function()
{
  return ["div",
           ["div",
             ["span",
               "class", "ui-button reload-window",
               "handler", "reload-window",
               "tabindex", "1"
             ]
           ],
           ["p",
             ui_strings.S_HTTP_INCOMPLETE_LOADING_GRAPH
           ],
           ["span",
             " ",
             "class", "close_incomplete_warning",
             "handler", "close-incomplete-warning",
             "tabindex", "1"
           ],
           "class", "info-box network_incomplete_warning"
         ];
}