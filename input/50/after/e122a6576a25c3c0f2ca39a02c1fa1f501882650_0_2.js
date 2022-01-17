function () {
        console.log("Disconnected, restarting.")
        setStateToError();
        process.exit(1);
    }