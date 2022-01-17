function(run_setup, run_loop) {
    run_setup = run_setup || setup || function(){};
    run_loop = run_loop ||
        ((typeof loop === "function") ? [ loop ] : false) ||
        ((typeof loop === "object") ? loop : false) ||
        [];
    if(cluster.isMaster) {
        run_setup();
        for(var x in run_loop) addLoop(run_loop[x], 0);
    } else {
        var childResolve = function childResolve(varNames) {
            var message = {'resolve': varNames};
            console.log('Child sending message ' + JSON.stringify(message));
            process.send(message);
            var myListener = function(m) {
                console.log('Child got message ' + JSON.stringify(m));
                if(m.vars) {
                    for(var pair in m.vars) {
                        try {
                            console.log(m.vars[pair].name + ' = ' + m.vars[pair].value);
                            eval(m.vars[pair].name + ' = ' + m.vars[pair].value);
                        } catch(ex) {
                            console.error('Unable to eval loop in ' + JSON.stringify(m));
                        }
                    }
                    var repeat = function repeat() {
                        loopFunc();
                        if(loopDelay) setTimeout(repeat, loopDelay);
                        else process.nextTick(repeat);
                    };
                    try {
                        repeat();
                    } catch(ex) {
                        var errName = ex.toString().match(/^ReferenceError: (\w+)\b/);
                        if(errName && errName[1]) {
                            childResolve([errName[1]]);
                        } else {
                            throw(ex);
                        }
                    }
                    process.removeListener('message', myListener);
                }
            };
            process.on('message', myListener);
        };
        childResolve(['loopFunc', 'loopDelay']);
    }
}