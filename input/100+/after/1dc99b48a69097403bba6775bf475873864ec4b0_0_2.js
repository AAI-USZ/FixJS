function(mysetup, myloop) {
    mysetup = mysetup || setup || function(){};
    myloop = myloop ||
        ((typeof loop === "function") ? [ loop ] : false) ||
        ((typeof loop === "object") ? loop : false) ||
        [];
    if(cluster.isMaster) {
        mysetup();
        for(var x in myloop) addLoop(myloop[x], 0);
    } else {
        var message = {'getLoop': true};
        //console.log('Child sending message ' + JSON.stringify(message));
        process.send(message);
        process.on('message', function(m) {
            //console.log('Child got message ' + JSON.stringify(m));
            var loopfunc = function() {};
            try {
                eval('loopfunc = ' + m.loop);
            } catch(ex) {
                console.error('Unable to eval loop in ' + JSON.stringify(m));
            }
            var repeat = function repeat() {
                loopfunc();
                if(m.delay) setTimeout(repeat, m.delay);
                else process.nextTick(repeat);
            };
            repeat();
        });
    }
}