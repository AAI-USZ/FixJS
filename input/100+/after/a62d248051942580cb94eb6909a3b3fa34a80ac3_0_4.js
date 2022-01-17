function createStringSetting(setting) {

    let hbox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    let setting_label = new Gtk.Label({label: settings_string[setting].label,
                                       xalign: 0 });

    let setting_entry = new Gtk.Entry({text: this._settings.get_string(setting)});
    setting_entry.connect('notify::leave', function(entry) {
        this._settings.set_string(setting, entry.text);
    });

    if (settings_string[setting].help) {
        setting_label.set_tooltip_text(settings_string[setting].help)
        setting_entry.set_tooltip_text(settings_string[setting].help)
    }

    hbox.pack_start(setting_label, true, true, 0);
    hbox.add(setting_entry);

    return hbox;
}