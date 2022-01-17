function buildPrefsWidget() {
    let frame = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL,
                              border_width: 10 });
    let vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL,
                             margin: 20, margin_top: 10 });

    for (setting in settings_bool) {
        let hbox = createBoolSetting(setting);
        vbox.add(hbox);
    }

    for (setting in settings_range) {
        let hbox = createRangeSetting(setting);
        vbox.add(hbox);
    }

    frame.add(vbox);
    frame.show_all();
    return frame;
}