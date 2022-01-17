function() {
        Main.overview.hide();

        let sources = this._settings.get_value(KEY_INPUT_SOURCES);
        let current = this._settings.get_uint(KEY_CURRENT_INPUT_SOURCE);
        let [type, id] = sources.get_child_value(current).deep_unpack();
        let xkbLayout = '';
        let xkbVariant = '';

        if (type == INPUT_SOURCE_TYPE_XKB) {
            [, , , xkbLayout, xkbVariant] = this._xkbInfo.get_layout_info(id);
        } else if (type == INPUT_SOURCE_TYPE_IBUS) {
            let engineDesc = this._ibusManager.getEngineDesc(id);
            if (engineDesc) {
                xkbLayout = engineDesc.get_layout();
                xkbVariant = '';
            }
        }

        if (!xkbLayout || xkbLayout.length == 0)
            return;

        let description = xkbLayout;
        if (xkbVariant.length > 0)
            description = description + '\t' + xkbVariant;

        Util.spawn(['gkbd-keyboard-display', '-l', description]);
    }