function(m) {
        //console.log('Parent got message ' + JSON.stringify(m));
        if(m.getLoop) {
            var message = {
                loop: myloop.toString(),
                delay: delay,
                callback: (callback?true:false)
            };
            worker.send(message);
        } else if(m.callback) {
            callback(m.value);
        }
    }