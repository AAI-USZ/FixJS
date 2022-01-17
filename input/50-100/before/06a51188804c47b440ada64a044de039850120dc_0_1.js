function (cmd) {
        if (cmd === 'quit') {
            con.ok('All done, shutting down.');

            // Shut down each port forward.

            forwards.forEach(function (f) {
                f.end();
            });

            // Shut down the CLI.

            rl.close();

            // Stop the VPN.
            // FIXME: Why is process.exit still necessary after rl.close?

            stopVPN(config, process.exit);
        } else {
            if (cmd !== '') {
                con.error('Invalid command "' + cmd + '"');
            }
            rl.prompt();
        }
    }