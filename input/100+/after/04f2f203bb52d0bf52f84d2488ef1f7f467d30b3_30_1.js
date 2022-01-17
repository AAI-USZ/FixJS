function(val) {
                    var dx, wave = this._.wave;
                    if (typeof val === "function") {
                        for (var i = 0; i < 1024; i++) {
                            wave[i] = val(i / 1024);
                        }
                    } else if (typeof val === "object" &&
                               (val instanceof Array ||
                                val.buffer instanceof ArrayBuffer)) {
                        if (val.length === 1024) {
                            this._.wave = val;
                        } else {
                            dx = val.length / 1024;
                            for (var i = 0; i < 1024; i++) {
                                wave[i] = val[(i * dx)|0] || 0.0;
                            }
                        }
                    } else if (typeof val === "string") {
                        if ((dx = this.getWavetable(val)) !== undefined) {
                            this._.wave = dx;
                        }
                    }
                }