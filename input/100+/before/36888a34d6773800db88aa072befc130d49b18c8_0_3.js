function() {
        if (this._activeConnection)
            // nothing to do
            return;

        // among all visible networks, pick the last recently used connection
        let best = null;
        let bestApObj = null;
        let bestTime = 0;
        for (let i = 0; i < this._networks.length; i++) {
            let apObj = this._networks[i];
            for (let j = 0; j < apObj.connections.length; j++) {
                let connection = apObj.connections[j];
                if (connection._timestamp > bestTime) {
                    best = connection;
                    bestTime = connection._timestamp;
                    bestApObj = apObj;
                }
            }
        }

        if (best) {
            for (let i = 0; i < bestApObj.accessPoints.length; i++) {
                let ap = bestApObj.accessPoints[i];
                if (ap.connection_valid(best)) {
                    this._client.activate_connection(best, this.device, ap.dbus_path, null);
                    break;
                }
            }
            return;
        }

        // XXX: what else to do?
        // for now, just pick a random network
        // (this function is called in a corner case anyway, that is, only when
        // the user toggles the switch and has more than one wireless device)
        if (this._networks.length > 0) {
            let connection = this._createAutomaticConnection(this._networks[0]);
            let accessPoints = sortAccessPoints(this._networks[0].accessPoints);
            this._client.add_and_activate_connection(connection, this.device, accessPoints[0].dbus_path, null);
        }
    }