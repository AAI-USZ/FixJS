function() {
        let sources = this._settings.get_value(KEY_INPUT_SOURCES);
        let nSources = sources.n_children();

        for (let i in this._layoutItems)
            this._layoutItems[i].destroy();

        for (let i in this._labelActors)
            this._labelActors[i].destroy();

        this._layoutItems = {};
        this._labelActors = {};

        let infos = [];
        let infosByShortName = {};

        for (let i = 0; i < nSources; i++) {
            let info = { exists: false };
            let [type, id] = sources.get_child_value(i).deep_unpack();

            if (type == INPUT_SOURCE_TYPE_XKB) {
                [info.exists, info.displayName, info.shortName, , ] =
                    this._xkbInfo.get_layout_info(id);
            } else if (type == INPUT_SOURCE_TYPE_IBUS) {
                let engineDesc = this._ibusManager.getEngineDesc(id);
                if (engineDesc) {
                    info.exists = true;
                    info.displayName = engineDesc.get_longname();
                    info.shortName = engineDesc.get_symbol();
                }
            }

            if (!info.exists)
                continue;

            info.sourceIndex = i;

            if (!(info.shortName in infosByShortName))
                infosByShortName[info.shortName] = [];
            infosByShortName[info.shortName].push(info);
            infos.push(info);
        }

        if (infos.length > 1) {
            this.actor.show();
        } else {
            this.menu.close();
            this.actor.hide();
        }

        for (let i = 0; i < infos.length; i++) {
            let info = infos[i];
            if (infosByShortName[info.shortName].length > 1) {
                let sub = infosByShortName[info.shortName].indexOf(info) + 1;
                info.shortName += String.fromCharCode(0x2080 + sub);
            }

            let item = new LayoutMenuItem(info.displayName, info.shortName);
            this._layoutItems[info.sourceIndex] = item;
            this.menu.addMenuItem(item, i);
            item.connect('activate', Lang.bind(this, function() {
                this._settings.set_value(KEY_CURRENT_INPUT_SOURCE,
                                         GLib.Variant.new_uint32(info.sourceIndex));
            }));

            let shortLabel = new St.Label({ text: info.shortName });
            this._labelActors[info.sourceIndex] = shortLabel;
            this._container.add_actor(shortLabel);
            this._container.set_skip_paint(shortLabel, true);
        }

        this._currentInputSourceChanged();
    }