function(container)
  {
    container.clearAndRender(
      ["div",
        ["span",
          "class", "ui-button reload-window",
          "handler", "reload-window",
          "tabindex", "1"],
        ["p", ui_strings.S_RESOURCE_CLICK_BUTTON_TO_FETCH_RESOURCES],
        "class", "info-box"
      ]
    );
  }