function (data) {
        var events = data.split("\n");
        for ( i in events ) {
            try {
                this.handle_event(events[i]);
            } catch (err) {
                console.error("Error while handling event '" + events[i] + '": ', err.message, err);
            }
        }
    }