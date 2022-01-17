function() {
    var MozAudio = function() {
        AudioDecoder.initialize.apply(this, arguments);
    }, $this = timbre.fn.buildPrototype(WebKitAudio, {
        base: "ar-only"
    });
    
    $this = AudioDecoder.setPrototype.call($this);
    
    
    var loadAudio = function(audio, opts) {
        var self = this, _ = this._;
        var output, buffer_index, istep;
        
        var loadFunc = function(e) {
            var samples, buffer, i, imax;
            try {
                samples = e.frameBuffer;
                buffer  = _.buffer;
                for (i = 0, imax = samples.length; i < imax; i += istep) {
                    buffer[buffer_index++] = samples[i|0];
                }
                audio.removeEventListener("MozAudioAvailable", loadFunc);
                audio.addEventListener("MozAudioAvailable", function(e) {
                    var samples, buffer, i, imax;
                    samples = e.frameBuffer;
                    buffer  = _.buffer;
                    for (i = 0, imax = samples.length; i < imax; i += istep) {
                        buffer[buffer_index++] = samples[i|0];
                    }
                }, false);
            } catch (e) {
                audio.removeEventListener("MozAudioAvailable", loadFunc);
                audio.pause();
                timbre.fn.doEvent(self, "error", [e]);
            }
        };
        
        audio.loop = false;
        audio.addEventListener("error", function(e) {
            timbre.fn.doEvent(self, "error", [e]);
        }, false);
        audio.addEventListener("loadedmetadata", function(e) {
            audio.volume = 0.0;
            _.buffer = new Float32Array((audio.duration * audio.mozSampleRate)|0);
            _.duration = audio.duration * 1000;
            buffer_index = 0;
            istep = audio.mozSampleRate / timbre.samplerate;
            audio.play();
            opts.buffer = _.buffer;
            opts.samplerate = audio.mozSampleRate;
            timbre.fn.doEvent(self, "loadedmetadata", [opts]);
        }, false);
        audio.addEventListener("MozAudioAvailable", loadFunc, false);
        audio.addEventListener("ended", function(e) {
            _.isloaded = true;
            timbre.fn.doEvent(self, "loadeddata", [opts]);
        }, false);
        audio.load();
    };
    
    $this.load = function(callback) {
        var self = this, _ = this._;
        var src, reader, opts;
        
        opts = { buffer:null, samplerate:0 };
        
        if (_.src instanceof File) {
            reader = new FileReader();
            reader.onload = function(e) {
                var audio, m;
                if ((m = /^data:(.*?);/.exec(e.target.result)) !== null) {
                    if ((new Audio("")).canPlayType(m[1])) {
                        audio = new Audio(e.target.result);
                        loadAudio.call(self, audio, opts);
                    } else {
                        timbre.fn.doEvent(self, "error", ["cannot play: '" + m[1] + "'"]);
                    }
                } else {
                    timbre.fn.doEvent(self, "error", ["file error"]);
                }
            };
            reader.readAsDataURL(_.src);
        } else {        
            src = this.getAudioSrc(_.src);
            if (src !== "") {
                loadAudio.call(this, new Audio(src), opts);
            }
            _.isloaded = false;
            _.buffer   = new Float32Array(0);
            _.phase    = 0;
        }
        return this;
    };
    
    return MozAudio;
}