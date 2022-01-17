function(code){
    
        //Workaround for https://github.com/joyent/node/issues/1669
        var flushed = process.stdout.flush && process.stdout.flush();
        if (!flushed) {
            process.once("drain", function () {
                process.exit(code || 0);
            });
        } else {
            process.exit(code || 0);
        }
    }