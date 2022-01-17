function(value) {
                    var dx, wave = this._.wave;
                    if (typeof value === "function") {
                        for (var i = 0; i < 1024; i++) {
                            wave[i] = value(i / 1024);
                        }
                    } else if (typeof value === "object" &&
                               (value instanceof Array ||
                                value.buffer instanceof ArrayBuffer)) {
                        if (value.length === 1024) {
                            this._.wave = value;
                        } else {
                            dx = value.length / 1024;
                            for (var i = 0; i < 1024; i++) {
                                wave[i] = value[(i * dx)|0] || 0.0;
                            }
                        }
                    } else if (typeof value === "string") {
                        if ((dx = this.getWavetable(value)) !== undefined) {
                            this._.wave = dx;
                        }
                    }
                }