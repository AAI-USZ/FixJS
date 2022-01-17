function() {
        console.log("Reconnect failed, restarting.");
        setStateToError();
        setTimeout(function () {
            process.exit(1);
        },30000);
    }