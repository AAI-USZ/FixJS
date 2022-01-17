function() {
        Main.overview.hide();

        let sources = this._settings.get_value(KEY_INPUT_SOURCES);
        let current = this._settings.get_uint(KEY_CURRENT_INPUT_SOURCE);
        let id = sources.get_child_value(current).deep_unpack()[1];
        let [, , , xkbLayout, xkbVariant] = this._xkbInfo.get_layout_info(id);

        if (!xkbLayout || xkbLayout.length == 0)
            return;

        let description = xkbLayout;
        if (xkbVariant.length > 0)
            description = description + '\t' + xkbVariant;

        Util.spawn(['gkbd-keyboard-display', '-l', description]);
    }