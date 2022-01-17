function (err) {
            if (err) {
                createHub();
            } else {
                error("Connected to " + url);
                prepareTests(client);
            }
        }