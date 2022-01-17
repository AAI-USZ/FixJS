function(entry, left_val, do_raw)
{
  return (
    ["div",
      ["span",
        ["span",
          "class", "close-request-detail",
          "handler", "close-request-detail",
          "tabindex", "1"
        ],
        "class", "resize-request-detail",
        "handler", "resize-request-detail"
      ],
      ["div",
        templates._details_content(entry, do_raw),
        "data-object-id", String(entry.id),
        "class", "entry-details"
      ],
    "class", "network-details-container",
    "style", "left:" + left_val + "px"]
  );
}