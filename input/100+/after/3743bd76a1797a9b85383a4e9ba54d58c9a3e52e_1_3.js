function(socket) {
            console.log('Client connected');

            // on disconnect
            socket.on('disconnect', function() {
                console.log('Client disconnected');
            });

            var shell = spawn(socket);
            var echo = function(data, callback) {
                console.log(data);
                callback({'data': data});
            };
            var platform = function(callback) {
                var msg = {'platform': bone};
                if(callback) callback(msg);
                return(msg);
            };

            var myfuncs = {
                'digitalWrite': { func: digitalWrite, args: [ 'pin', 'value' ] },
                'digitalRead': { func: digitalRead, args: [ 'pin' ] },
                'analogRead': { func: analogRead, args: [ 'pin' ] },
                'analogWrite': { func: analogWrite, args: [ 'pin', 'value', 'freq' ] },
                'pinMode': { func: pinMode, args: [ 'pin', 'direction', 'mux', 'pullup', 'slew' ] },
                'shiftOut': { func: shiftOut, args: [ 'dataPin', 'clockPin', 'bitOrder', 'val' ] },
                'attachInterrupt': { func: attachInterrupt, args: [ 'pin', 'mode' ] },
                'getPinMode': { func: getPinMode, args: [ 'pin' ] },
                'getEeproms': { func: getEeproms, args: [] },
                'delay': { func: delay, args: [] },
                'platform': { func: platform, args: [] },
                'shell': { func: shell, args: [ 'command' ] },
                'echo': { func: echo, args: [ 'data' ] },
                'addLoop': { func: addLoop, args: [ 'loopFunc', 'loopDelay' ] },
                'getLoops': { func: getLoops, args: [] },
                'removeLoop': { func: removeLoop, args: [ 'loopid' ] }
            };
            var callMyFunc = function(name, m) {
                var callback = function(resp) {
                    resp = resp || {};
                    if(m && m.seq) resp.seq = m.seq;
                    socket.emit(name, resp);
                };
                try {
                    var callargs = [];
                    for(var arg in myfuncs[name].args) {
                        var argname = myfuncs[name].args[arg];
                        if(m) {
                            callargs.push(m[argname]);
                        } else {
                            callargs.push(undefined);
                        }
                    }
                    callargs.push(callback);
                    myfuncs[name].func.apply(this, callargs);
                } catch(ex) {
                    console.log('Error handing ' + name + ' message: ' + ex);
                }
            }
            var addSocketX = function(name) {
                socket.on(name, function(m) { callMyFunc(name, m); });
            };
            for(var myfunc in myfuncs) {
                addSocketX(myfunc);
            }

            // call user-provided on-connect function
            if(typeof onconnect == 'function')
                onconnect(socket);
        }