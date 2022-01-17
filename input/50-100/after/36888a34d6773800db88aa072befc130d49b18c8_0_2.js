function() {
        let title;
        if (this._activeConnection && this._activeConnection._connection)
            title = this._activeConnection._connection.get_id();
        else
            title = _("Connected (private)");

        if (this._activeNetwork)
            this._activeConnectionItem = new NMNetworkMenuItem(this.device.active_access_point, undefined,
                                                               { reactive: false });
        else
            this._activeConnectionItem = new PopupMenu.PopupImageMenuItem(title,
                                                                          'network-wireless-connected',
                                                                          { reactive: false });
        this._activeConnectionItem.setShowDot(true);
    }