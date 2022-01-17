function(myloop, delay, callback) {
    delay = delay || 0;
    callback = callback || function(){};
    var worker = cluster.fork();
    cluster.on('death', function(worker) {
        console.log('Loop with PID ' + worker.pid + ' died');
    });
    process.on('SIGTERM', function() {
        worker.kill();
    });
    worker.on('message', function(m) {
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
    });
    return(true);
}