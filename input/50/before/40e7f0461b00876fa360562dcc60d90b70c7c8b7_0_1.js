function (data) {
            /// <summary>Sends data over the connection</summary>
            /// <param name="data" type="String">The data to send over the connection</param>
            /// <returns type="signalR" />
            var connection = this;

            if (connection.state !== signalR.connectionState.connected) {
                // Connection hasn't been started yet
                throw "SignalR: Connection must be started before data can be sent. Call .start() before .send()";
            }

            connection.transport.send(connection, data);
            // REVIEW: Should we return deferred here?
            return connection;
        }