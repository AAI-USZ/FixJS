function repeat() {
                        var value = loopFunc();
                        if(value) process.send({'callback':true, 'value':value});
                        if(loopDelay) setTimeout(repeat, loopDelay);
                        else process.nextTick(repeat);
                    }