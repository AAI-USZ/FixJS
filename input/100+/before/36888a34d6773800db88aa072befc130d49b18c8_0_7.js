function() {
                let accessPoints = sortAccessPoints(apObj.accessPoints);
                if (   (accessPoints[0]._secType == NMAccessPointSecurity.WPA2_ENT)
                    || (accessPoints[0]._secType == NMAccessPointSecurity.WPA_ENT)) {
                    // 802.1x-enabled APs require further configuration, so they're
                    // handled in gnome-control-center
                    Util.spawn(['gnome-control-center', 'network', 'connect-8021x-wifi',
                                this.device.get_path(), accessPoints[0].dbus_path]);
                } else {
                    let connection = this._createAutomaticConnection(apObj);
                    this._client.add_and_activate_connection(connection, this.device, accessPoints[0].dbus_path, null)
                }
            }