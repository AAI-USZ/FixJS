function (cmd) {
        if (cmd === 'quit') {
            con.ok('All done, shutting down.');

            // Shut down each port forward.

            forwards.forEach(function (f) {
                f.end();
            });

            // When the CLI has shut down, stop the VPN.

            rl.on('close', function () {
                // FIXME: Why is process.exit still necessary after rl.close?

                stopVPN(config, process.exit);
            });

            // Shut down the CLI.

            rl.close();
        } else {
            if (cmd !== '') {
                con.error('Invalid command "' + cmd + '"');
            }
            rl.prompt();
        }
    }