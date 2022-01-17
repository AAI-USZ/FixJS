function(bestAP, title, params) {
        this.parent(params);

        this.bestAP = bestAP;

        if (!title) {
            let ssid = this.bestAP.get_ssid();
            title = ssidToLabel(ssid);
        }

        this._label = new St.Label({ text: title });
        this.actor.label_actor = this._label;
        this.addActor(this._label);
        this._icons = new St.BoxLayout({ style_class: 'nm-menu-item-icons' });
        this.addActor(this._icons, { align: St.Align.END });

        this._signalIcon = new St.Icon({ icon_name: this._getIcon(),
                                         style_class: 'popup-menu-icon' });
        this._icons.add_actor(this._signalIcon);

        this._secureIcon = new St.Icon({ style_class: 'popup-menu-icon' });
        if (this.bestAP._secType != NMAccessPointSecurity.UNKNOWN &&
            this.bestAP._secType != NMAccessPointSecurity.NONE)
            this._secureIcon.icon_name = 'network-wireless-encrypted';
        this._icons.add_actor(this._secureIcon);
    }