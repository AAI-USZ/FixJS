function(device, accessPoint) {
        if (accessPoint.get_ssid() == null) {
            // This access point is not visible yet
            // Wait for it to get a ssid
            accessPoint._notifySsidId = accessPoint.connect('notify::ssid', Lang.bind(this, this._notifySsidCb));
            return;
        }

        let pos = this._findNetwork(accessPoint);
        let apObj;
        let needsupdate = false;

        if (pos != -1) {
            apObj = this._networks[pos];
            if (apObj.accessPoints.indexOf(accessPoint) != -1) {
                log('Access point was already seen, not adding again');
                return;
            }

            apObj.accessPoints.push(accessPoint);
            if (apObj.item)
                apObj.item.updateAccessPoints(apObj.accessPoints);
        } else {
            apObj = { ssid: accessPoint.get_ssid(),
                      mode: accessPoint.mode,
                      security: this._getApSecurityType(accessPoint),
                      connections: [ ],
                      item: null,
                      accessPoints: [ accessPoint ]
                    };
            apObj.ssidText = ssidToLabel(apObj.ssid);
        }

        // check if this enables new connections for this group
        for (let i = 0; i < this._connections.length; i++) {
            let connection = this._connections[i].connection;
            if (accessPoint.connection_valid(connection) &&
                apObj.connections.indexOf(connection) == -1) {
                apObj.connections.push(connection);

                // this potentially changes the order
                needsupdate = true;
            }
        }

        if (pos == -1 || needsupdate) {
            if (pos != -1)
                this._networks.splice(pos, 1);
            pos = Util.insertSorted(this._networks, apObj, this._networkSortFunction);

            this._clearSection();
            this._queueCreateSection();
        }
    }