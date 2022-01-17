function(value) {
                    var buffer, i, _ = this._;
                    if (typeof value === "object") {
                        if (value instanceof Float32Array) {
                            _.buffer = value;
                        } else if (value instanceof Array ||
                                   value.buffer instanceof ArrayBuffer) {
                            buffer = new Float32Array(value.length);
                            for (i = buffer.length; i--; ) {
                                buffer[i] = value[i];
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