function()
{
  new Settings(
    // view_id
    "network_logger",
    // key-value map
    {
      "selected-viewmode": "graphs",
      "pause": false,
      "detail-view-left-pos": 120,
      "track-content": true
    },
    // key-label map
    {
      "pause": ui_strings.S_TOGGLE_PAUSED_UPDATING_NETWORK_VIEW,
      "track-content": ui_strings.S_NETWORK_CONTENT_TRACKING_SETTING_TRACK_LABEL
    },
    // settings map
    {
      checkboxes: ["track-content"]
    },
    // templates
    {
    },
    // group
    "general"
  );

  new ToolbarConfig(
    {
      view: "network_logger",
      groups: [
        {
          type: UI.TYPE_BUTTONS,
          items: [
            {
              handler: "clear-log-network-view",
              icon: "clear-log-network-view",
              title: ui_strings.S_CLEAR_NETWORK_LOG
            }
          ]
        },
        {
          type: UI.TYPE_SWITCH,
          items: [
            {
              key: "network_logger.pause",
              icon: "pause-network-view"
            }
          ]
        },
        {
          type: UI.TYPE_SINGLE_SELECT,
          name: "selected-viewmode",
          default_value: window.settings.network_logger.get("selected-viewmode"),
          items: [
            {
              value: "graphs",
              title: ui_strings.S_HTTP_LABEL_GRAPH_VIEW,
              icon: "network-view-toggle-graphs"
            },
            {
              value: "data",
              title: ui_strings.S_HTTP_LABEL_DATA_VIEW,
              icon: "network-view-toggle-data"
            }
          ]
        },
        {
          type: UI.TYPE_SINGLE_SELECT,
          name: "type-filter",
          allow_multiple_select: true,
          items: [
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_ALL,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_ALL,
              value: "all"
            },
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_MARKUP,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_MARKUP,
              value: "markup"
            },
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_STYLESHEETS,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_STYLESHEETS,
              value: "css"
            },
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_SCRIPTS,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_SCRIPTS,
              value: "script"
            },
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_IMAGES,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_IMAGES,
              value: "image"
            },
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_OTHER,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_OTHER,
              value: "other_types"
            },
            {
              text: ui_strings.S_HTTP_LABEL_FILTER_XHR,
              title: ui_strings.S_HTTP_TOOLTIP_FILTER_XHR,
              value: "xhr"
            }
          ]
        },
        {
          type: UI.TYPE_INPUT,
          items: [
            {
              handler: "network-text-search",
              shortcuts: "network-text-search",
              title: ui_strings.S_SEARCH_INPUT_TOOLTIP,
              label: ui_strings.S_INPUT_DEFAULT_TEXT_SEARCH
            }
          ]
        }
      ]
    }
  );

  var text_search = window.views.network_logger.text_search = new TextSearch();

  window.eventHandlers.input["network-text-search"] = function(event, target)
  {
    text_search.searchDelayed(target.value);
  };
  ActionBroker.get_instance().get_global_handler().
      register_shortcut_listener("network-text-search", cls.Helpers.shortcut_search_cb.bind(text_search));

  var on_view_created = function(msg)
  {
    if (msg.id === "network_logger")
    {
      var scroll_container = msg.container.querySelector(".request-details");
      if (!scroll_container)
        scroll_container = msg.container.querySelector("#network-outer-container");

      if (scroll_container)
      {
        text_search.setContainer(scroll_container);
        text_search.setFormInput(
          views.network_logger.getToolbarControl(msg.container, "network-text-search")
        );
      }
    }
  }

  var on_view_destroyed = function(msg)
  {
    if (msg.id == "network_logger")
    {
      text_search.cleanup();
    }
  }

  messages.addListener("view-created", on_view_created);
  messages.addListener("view-destroyed", on_view_destroyed);
}