function(loopFunc, loopDelay, callback) {
    loopDelay = loopDelay || 0;
    callback = callback || function(){};
    var worker = cluster.fork();
    cluster.on('death', function(worker) {
        console.log('Loop with PID ' + worker.pid + ' died');
    });
    process.on('SIGTERM', function() {
        worker.kill();
    });
    worker.on('message', function(m) {
        console.log('Parent got message ' + JSON.stringify(m));
        if(m.resolve) {
            var pairs = [];
            for(var name in m.resolve) {
                var value = eval(m.resolve[name]);
                pairs.push({
                    'name': m.resolve[name],
                    'value': value.toString()
                });
            }
            worker.send({'vars': pairs});
        } else if(m.callback) {
            callback(m.value);
        }
    });
    return(true);
}