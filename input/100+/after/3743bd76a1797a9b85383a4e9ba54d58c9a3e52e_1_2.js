function(m) {
                        if(m.readVars) {
                            console.log('Child got message ' + JSON.stringify(m));
                            var message = {
                                'readVars': true,
                                'loopFunc': loopFunc,
                                'loopDelay': loopDelay
                            };
                            process.send(message);
                        }
                    }