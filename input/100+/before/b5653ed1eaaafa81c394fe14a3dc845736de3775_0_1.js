function() {
    var WebKitAudio = function() {
        AudioDecoder.initialize.apply(this, arguments);
    }, $this = timbre.fn.buildPrototype(WebKitAudio, {
        base: "ar-only"
    });
    
    $this = AudioDecoder.setPrototype.call($this);
    
    
    $this.load = function() {
        var self = this, _ = this._;
        var src, ctx, xhr, opts;
        var reader;
        
        ctx  = new webkitAudioContext();
        xhr  = new XMLHttpRequest();
        opts = { buffer:null, samplerate:ctx.sampleRate };
        
        if (_.src instanceof File) {
            reader = new FileReader();
            reader.onload = function(e) {
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
            };
            reader.readAsArrayBuffer(_.src);
        } else {
            src = this.getAudioSrc(_.src);
            if (src !== "") {
                xhr.open("GET", src, true);
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = function(event) {
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            timbre.fn.doEvent(self, "error", [xhr]);
                        }
                    }
                };
                xhr.onload = function() {
                    _.buffer = ctx.createBuffer(xhr.response, true).getChannelData(0);
                    _.duration  = _.buffer.length / timbre.samplerate * 1000;
                    opts.buffer = _.buffer;
                    
                    timbre.fn.doEvent(self, "loadedmetadata", [opts]);
                    _.isloaded = true;
                    timbre.fn.doEvent(self, "loadeddata", [opts]);
                };
                xhr.send();
            } else {
                timbre.fn.doEvent(self, "error", [xhr]);
            }
            _.isloaded = false;
            _.buffer   = new Float32Array(0);
            _.phase    = 0;
        }
        return this;
    };
    
    return WebKitAudio;
}