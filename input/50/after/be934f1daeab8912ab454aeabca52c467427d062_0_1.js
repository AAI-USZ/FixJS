function(err) {
        console.log(err);
        console.log("Socket error, restarting.")
        setStateToError();
        setTimeout(function() {
            process.exit(1);
        },30000);
    }