function (err) {
            if (err) {
                if (options.hub) {
                    error("Unable to connect to Hub at", url,
                        "with", err.stack);
                }
                createHub();
            } else {
                error("Connected to " + url);
                prepareTests(client);
            }
        }