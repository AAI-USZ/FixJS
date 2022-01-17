function init() {
    this._settings = Convenience.getSettings();
    settings_choice = {
        "position": { label: _("Button position"),
                      options: {"Left"  : 2,
                                "Center": 1,
                                "Right" : 0},
                  }
    }
    settings_string = {
        "number-format": { label: _("Text format"),
                           help: _("Available replacements:"
                                 + "{unread} - number of unread messages"
                                 + "{total} - total number of messages in inbox"),
                           default: "{unread} ({total})"}
    }
    settings_bool = {
        "notify-on-new-messages" : {label: _("Notify about incoming mail")},
        "use-default-mail-reader": {label: _("Use default mail reader instead of gmail in browser")},
        "show-unread-numbers"    : {label: _("Show number of unread messages")},
    };
    settings_range = {
        "timeout": {label: _("Check interval"),
                  help: _("Amount of time to check for new messages in seconds"),
                  min: 60, max: 360, step: 30, default: 180}
    };
}