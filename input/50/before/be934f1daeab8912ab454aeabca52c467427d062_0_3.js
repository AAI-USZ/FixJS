function() {
        console.log("Reconnect failed, retrying");
        setStateToError();
        setTimeout(function () {
            socket = io.connect(config.cloudHost,ioOpts);
        }, 5000);
    }