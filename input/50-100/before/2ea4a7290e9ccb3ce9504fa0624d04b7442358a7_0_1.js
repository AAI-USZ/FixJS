function (local) {

        // We end up here when a connection is made to the local side.
        // Set up a connection to the remote side.

        var remote = net.connect(remotePort, remoteHost, function (err) {

            // An error here shouldn't bring us down completely, but it should
            // be noted and the local side should be closed.

            if (err) {
                local.end();
            } else {

                // We're connected to the remote side. Set up two pipes that simply
                // shuffle data to and fro both directions.

                local.pipe(remote);
                remote.pipe(local);
            }
        });

        // When the remote sides closes the connection, we close the local side.

        remote.on('close', function () {
            local.end();
        });

        // When the local side closes the connection, we close the remote side.

        local.on('end', function() {
            remote.end();
        });
    }