function(m) {
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
        }