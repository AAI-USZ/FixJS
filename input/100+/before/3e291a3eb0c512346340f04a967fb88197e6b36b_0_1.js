function(e) {
                _.buffer = ctx.createBuffer(e.target.result, true).getChannelData(0);
                _.duration  = _.buffer.length / timbre.samplerate * 1000;
                opts.buffer = _.buffer;
                
                timbre.fn.doEvent(self, "loadedmetadata", [opts]);
                _.isloaded = true;
                timbre.fn.doEvent(self, "loadeddata", [opts]);
            }