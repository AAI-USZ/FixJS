function repeat() {
                        var value = loopFunc();
                        if(value) process.message({'callback':value});
                        if(loopDelay) setTimeout(repeat, loopDelay);
                        else process.nextTick(repeat);
                    }