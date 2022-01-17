function createRangeSetting(setting) {
    let hbox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });

    let setting_label = new Gtk.Label({ label: settings_range[setting].label,
                                        xalign: 0 });

    let setting_range = Gtk.HScale.new_with_range( settings_range[setting].min,
                                                   settings_range[setting].max,
                                                   settings_range[setting].step);
    setting_range.set_value(this._settings.get_int(setting));
    setting_range.set_draw_value(false);
    setting_range.add_mark(settings_range[setting].default,
                           Gtk.PositionType.BOTTOM, null);
    setting_range.set_size_request(200, -1);
    setting_range.connect('value-changed', function(slider) {
        this._settings.set_int(setting, slider.get_value());
    });

    if (settings_range[setting].help) {
        setting_label.set_tooltip_text(settings_range[setting].help)
        setting_range.set_tooltip_text(settings_range[setting].help)
    }

    hbox.pack_start(setting_label, true, true, 0);
    hbox.add(setting_range);

    return hbox;
}