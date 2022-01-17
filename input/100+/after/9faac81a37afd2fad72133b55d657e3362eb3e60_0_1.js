function(role, indicator, position) {
        if (this._statusArea[role])
            throw new Error('Extension point conflict: there is already a status indicator for role ' + role);

        if (!(indicator instanceof PanelMenu.Button))
            throw new TypeError('Status indicator must be an instance of PanelMenu.Button');

        if (!position)
            position = 0;
        this._insertStatusItem(indicator.actor, position);
        if (indicator.menu)
            this._menus.addMenu(indicator.menu);

        this._statusArea[role] = indicator;
        let destroyId = indicator.connect('destroy', Lang.bind(this, function(emitter) {
            this._statusArea[role] = null;
            emitter.disconnect(destroyId);
        }));

        return indicator;
    }