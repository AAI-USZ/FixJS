function(err) {
        console.log(err);
        console.log("Socket error, retrying connection")
        setTimeout(function () {
            socket = io.connect(config.cloudHost,ioOpts);
        }, 5000);
        setStateToError();
    }