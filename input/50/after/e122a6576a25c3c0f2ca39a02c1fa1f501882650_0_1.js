function(err) {
        console.log(err);
        console.log("Socket error, retrying connection")
        setStateToError();
    }