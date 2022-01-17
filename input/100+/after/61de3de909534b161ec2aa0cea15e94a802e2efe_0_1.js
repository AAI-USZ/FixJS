function() {
        this.parent(0.0, _('Network'));

        this._box = new St.BoxLayout({ name: 'networkMenu' });
        this.actor.add_actor (this._box);
        this.actor.add_style_class_name('panel-status-button');

        this._primaryIcon = new St.Icon({ icon_name: 'network-offline',
                                          icon_type: St.IconType.SYMBOLIC,
                                          style_class: 'system-status-icon' });
        this._box.add_actor(this._primaryIcon);

        this._secondaryIcon = new St.Icon({ icon_name: 'network-vpn',
                                            icon_type: St.IconType.SYMBOLIC,
                                            style_class: 'system-status-icon',
                                            visible: false });
        this._box.add_actor(this._secondaryIcon);

        this._client = NMClient.Client.new();

        this._statusSection = new PopupMenu.PopupMenuSection();
        this._statusItem = new PopupMenu.PopupMenuItem('', { style_class: 'popup-inactive-menu-item', reactive: false });
        this._statusSection.addMenuItem(this._statusItem);
        this._statusSection.addAction(_("Enable networking"), Lang.bind(this, function() {
            this._client.networking_enabled = true;
        }));
        this._statusSection.actor.hide();
        this.menu.addMenuItem(this._statusSection);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        this._activeConnections = [ ];
        this._connections = [ ];

        this._mainConnection = null;
        this._vpnConnection = null;
        this._activeAccessPointUpdateId = 0;
        this._activeAccessPoint = null;
        this._mobileUpdateId = 0;
        this._mobileUpdateDevice = null;

        this._devices = { };

        this._devices.wired = {
            section: new PopupMenu.PopupMenuSection(),
            devices: [ ],
            item: new NMWiredSectionTitleMenuItem(_("Wired"))
        };

        this._devices.wired.section.addMenuItem(this._devices.wired.item);
        this._devices.wired.section.actor.hide();
        this.menu.addMenuItem(this._devices.wired.section);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        this._devices.wireless = {
            section: new PopupMenu.PopupMenuSection(),
            devices: [ ],
            item: this._makeToggleItem('wireless', _("Wireless"))
        };
        this._devices.wireless.section.addMenuItem(this._devices.wireless.item);
        this._devices.wireless.section.actor.hide();
        this.menu.addMenuItem(this._devices.wireless.section);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        this._devices.wwan = {
            section: new PopupMenu.PopupMenuSection(),
            devices: [ ],
            item: this._makeToggleItem('wwan', _("Mobile broadband"))
        };
        this._devices.wwan.section.addMenuItem(this._devices.wwan.item);
        this._devices.wwan.section.actor.hide();
        this.menu.addMenuItem(this._devices.wwan.section);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        this._devices.vpn = {
            section: new PopupMenu.PopupMenuSection(),
            device: this._makeWrapperDevice(NMDeviceVPN, null),
            item: new NMWiredSectionTitleMenuItem(_("VPN Connections"))
        };
        this._devices.vpn.section.addMenuItem(this._devices.vpn.item);
        this._devices.vpn.section.addMenuItem(this._devices.vpn.device.section);
        this._devices.vpn.section.actor.hide();
        this.menu.addMenuItem(this._devices.vpn.section);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        this.menu.addSettingsAction(_("Network Settings"), 'gnome-network-panel.desktop');

        // Device types
        this._dtypes = { };
        this._dtypes[NetworkManager.DeviceType.ETHERNET] = NMDeviceWired;
        this._dtypes[NetworkManager.DeviceType.WIFI] = NMDeviceWireless;
        this._dtypes[NetworkManager.DeviceType.MODEM] = NMDeviceModem;
        this._dtypes[NetworkManager.DeviceType.BT] = NMDeviceBluetooth;
        // TODO: WiMax support

        // Connection types
        this._ctypes = { };
        this._ctypes[NetworkManager.SETTING_WIRELESS_SETTING_NAME] = NMConnectionCategory.WIRELESS;
        this._ctypes[NetworkManager.SETTING_WIRED_SETTING_NAME] = NMConnectionCategory.WIRED;
        this._ctypes[NetworkManager.SETTING_PPPOE_SETTING_NAME] = NMConnectionCategory.WIRED;
        this._ctypes[NetworkManager.SETTING_PPP_SETTING_NAME] = NMConnectionCategory.WIRED;
        this._ctypes[NetworkManager.SETTING_BLUETOOTH_SETTING_NAME] = NMConnectionCategory.WWAN;
        this._ctypes[NetworkManager.SETTING_CDMA_SETTING_NAME] = NMConnectionCategory.WWAN;
        this._ctypes[NetworkManager.SETTING_GSM_SETTING_NAME] = NMConnectionCategory.WWAN;
        this._ctypes[NetworkManager.SETTING_VPN_SETTING_NAME] = NMConnectionCategory.VPN;

        this._settings = NMClient.RemoteSettings.new(null);
        this._connectionsReadId = this._settings.connect('connections-read', Lang.bind(this, function() {
            this._readConnections();
            this._readDevices();
            this._syncNMState();

            // Connect to signals late so that early signals don't find in inconsistent state
            // and connect only once (this signal handler can be called again if NetworkManager goes up and down)
            if (!this._inited) {
                this._inited = true;
                this._client.connect('notify::manager-running', Lang.bind(this, this._syncNMState));
                this._client.connect('notify::networking-enabled', Lang.bind(this, this._syncNMState));
                this._client.connect('notify::state', Lang.bind(this, this._syncNMState));
                this._client.connect('notify::active-connections', Lang.bind(this, this._updateIcon));
                this._client.connect('device-added', Lang.bind(this, this._deviceAdded));
                this._client.connect('device-removed', Lang.bind(this, this._deviceRemoved));
                this._settings.connect('new-connection', Lang.bind(this, this._newConnection));
            }
        }));
    }