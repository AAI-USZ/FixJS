function(e) {
                var buffer;
                
                try {
                    buffer = ctx.createBuffer(e.target.result, true);
                } catch (e) {
                    buffer = null;
                }
                
                if (buffer !== null) {
                    _.buffer    = buffer.getChannelData(0);
                    _.duration  = _.buffer.length / timbre.samplerate * 1000;
                    opts.buffer = _.buffer;
                    
                    timbre.fn.doEvent(self, "loadedmetadata", [opts]);
                    _.isloaded = true;
                    timbre.fn.doEvent(self, "loadeddata", [opts]);
                } else {
                    timbre.fn.doEvent(self, "error", [e]);
                }
            }