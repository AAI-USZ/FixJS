function() {
            let accessPoints = accessPointObj.accessPoints;
            for (let i = 0; i < accessPoints.length; i++) {
                if (accessPoints[i].connection_valid(connection)) {
                    this._client.activate_connection(connection, this.device, accessPoints[i].dbus_path, null);
                    break;
                }
            }
        }