function(m) {
        if(m.getLoop) {
            var message = {
                myloop: myloop,
                delay: delay,
                callback: (callback?true:false)
            };
            worker.send(message);
        } else if(m.callback) {
            callback(m.callback);
        }
    }