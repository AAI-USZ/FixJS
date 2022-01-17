function(m) {
                //console.log('Child got message ' + JSON.stringify(m));
                if(m.vars) {
                    for(var pair in m.vars) {
                        try {
                            //console.log(m.vars[pair].name + ' = ' + m.vars[pair].value);
                            eval(m.vars[pair].name + ' = ' + m.vars[pair].value);
                        } catch(ex) {
                            console.error('Unable to eval loop in ' + JSON.stringify(m));
                        }
                    }
                    var repeat = function repeat() {
                        var value = loopFunc();
                        if(value) process.message({'callback':value});
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
            }