function() {
        let closedConnections = [ ];
        let newActiveConnections = this._client.get_active_connections() || [ ];
        for (let i = 0; i < this._activeConnections.length; i++) {
            let a = this._activeConnections[i];
            if (newActiveConnections.indexOf(a) == -1) // connection is removed
                closedConnections.push(a);
        }

        for (let i = 0; i < closedConnections.length; i++) {
            let active = closedConnections[i];
            if (active._primaryDevice) {
                active._primaryDevice.setActiveConnection(null);
                active._primaryDevice = null;
            }
            if (active._inited) {
                active.disconnect(active._notifyStateId);
                active.disconnect(active._notifyDefaultId);
                active.disconnect(active._notifyDefault6Id);
                active._inited = false;
            }
        }

        this._activeConnections = newActiveConnections;
        this._mainConnection = null;
        this._vpnConnection = null;

        let activating = null;
        let default_ip4 = null;
        let default_ip6 = null;
        let active_vpn = null;
        for (let i = 0; i < this._activeConnections.length; i++) {
            let a = this._activeConnections[i];

            if (!a._inited) {
                a._notifyDefaultId = a.connect('notify::default', Lang.bind(this, this._updateIcon));
                a._notifyDefault6Id = a.connect('notify::default6', Lang.bind(this, this._updateIcon));
                a._notifyStateId = a.connect('notify::state', Lang.bind(this, this._notifyActivated));

                a._inited = true;
            }

            if (!a._connection) {
                a._connection = this._settings.get_connection_by_path(a.connection);

                if (a._connection) {
                    a._type = a._connection._type;
                    a._section = this._ctypes[a._type];
                } else {
                    a._connection = null;
                    a._type = null;
                    a._section = null;
                    log('Cannot find connection for active (or connection cannot be read)');
                }
            }

            if (a['default'])
                default_ip4 = a;
            if (a.default6)
                default_ip6 = a;

            if (a._type == 'vpn')
                active_vpn = a;
            else if (a.state == NetworkManager.ActiveConnectionState.ACTIVATING)
                activating = a;

            if (!a._primaryDevice) {
                if (a._type != NetworkManager.SETTING_VPN_SETTING_NAME) {
                    // find a good device to be considered primary
                    a._primaryDevice = null;
                    let devices = a.get_devices() || [];
                    for (let j = 0; j < devices.length; j++) {
                        let d = devices[j];
                        if (d._delegate) {
                            a._primaryDevice = d._delegate;
                            break;
                        }
                    }
                } else
                    a._primaryDevice = this._devices.vpn.device

                if (a._primaryDevice)
                    a._primaryDevice.setActiveConnection(a);

                if (a.state == NetworkManager.ActiveConnectionState.ACTIVATED
                    && a._primaryDevice && a._primaryDevice._notification) {
                    a._primaryDevice._notification.destroy();
                    a._primaryDevice._notification = null;
                }
            }
        }

        this._mainConnection = activating || default_ip4 || default_ip6 || this._activeConnections[0] || null;
        this._vpnConnection = active_vpn;
    }