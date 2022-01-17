function(val) {
                    var buffer, i, _ = this._;
                    if (typeof val === "object") {
                        if (val instanceof Float32Array) {
                            _.buffer = val;
                        } else if (val instanceof Array ||
                                   val.buffer instanceof ArrayBuffer) {
                            buffer = new Float32Array(val.length);
                            for (i = buffer.length; i--; ) {
                                buffer[i] = val[i];
                            }
                            _.buffer = buffer;
                            _.duration = buffer.length / timbre.samplerate * 1000;
                            if (_.reversed) {
                                _.phase = Math.max(0, _.buffer.length - 1);
                            } else {
                                _.phase = 0;
                            }
                        }
                    }
                }