function createBoolSetting(setting) {

    let hbox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    let setting_label = new Gtk.Label({label: settings_bool[setting].label,
                                       xalign: 0 });

    let setting_switch = new Gtk.Switch({active: settings.get_boolean(setting)});
    setting_switch.connect('notify::active', function(button) {
        settings.set_boolean(setting, button.active);
    });

    if (settings_bool[setting].help) {
        setting_label.set_tooltip_text(settings_bool[setting].help)
        setting_switch.set_tooltip_text(settings_bool[setting].help)
    }

    hbox.pack_start(setting_label, true, true, 0);
    hbox.add(setting_switch);

    return hbox;
}