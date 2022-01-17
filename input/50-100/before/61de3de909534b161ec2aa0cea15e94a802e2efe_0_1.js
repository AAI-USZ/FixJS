function() {
        if (!this._source) {
            this._source = new MessageTray.Source(_("Network Manager"),
                                                  'network-transmit-receive',
                                                  St.IconType.SYMBOLIC);

            this._source.connect('destroy', Lang.bind(this, function() {
                this._source = null;
            }));
            Main.messageTray.add(this._source);
        }
    }