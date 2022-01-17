function init() {
    Lib.initTranslations(Me);
    settings = Lib.getSettings(Me);
    settings_bool = {
        notifyOnNewMessages: {label: _("Notify about incoming mail")},
        rundefault: {label: _("Allow to start the default media player")},
        volume: {label: _("Show the media player volume slider")},
        position: {label: _("Show the media player position slider")},
        playlists: {label: _("Show media player playlists")}
    };
    settings_range = {
        timeout: {label: _("Check interval"),
                  help: _("Amount of time to check for new messages in seconds"),
                  min: 60, max: 360, step: 30, default: 180}
    };
}