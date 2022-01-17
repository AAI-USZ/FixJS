function()
  {
    var window_controls = document.querySelector("window-controls");
    if (window_controls)
    {
      window_controls.parentNode.removeChild(window_controls);
    }

    var is_attached = window.opera.attached;

    var controls = [
      new Button("toggle-console", "", ui_strings.S_BUTTON_TOGGLE_CONSOLE),
      new ToolbarSeparator(),
      new Button("toggle-settings-overlay", "", ui_strings.S_BUTTON_TOGGLE_SETTINGS, "toggle-overlay", {"data-overlay-id": "settings-overlay"}),
      new Button("toggle-remote-debug-overlay", "", ui_strings.S_BUTTON_TOGGLE_REMOTE_DEBUG, "toggle-overlay", {"data-overlay-id": "remote-debug-overlay"}),
      new ToolbarSeparator(),
      window['cst-selects']['debugger-menu'],
      new Button("top-window-toggle-attach", is_attached ? "attached" : "", is_attached ? ui_strings.S_SWITCH_DETACH_WINDOW : ui_strings.S_SWITCH_ATTACH_WINDOW)
    ];

    if (is_attached)
    {
      controls.push(new Button("top-window-close", "", ui_strings.S_BUTTON_LABEL_CLOSE_WINDOW));
    }

    var win_ctrls = document.documentElement.render(templates.window_controls(controls));
    window.messages.post("window-controls-created", {window_controls: win_ctrls});

    var button = UI.get_instance().get_button("toggle-remote-debug-overlay");
    if (button)
    {
      if (this.current_client && this.connection_is_remote(this.current_client))
        button.addClass("remote-active");
      else
        button.removeClass("remote-active");
    }
  }