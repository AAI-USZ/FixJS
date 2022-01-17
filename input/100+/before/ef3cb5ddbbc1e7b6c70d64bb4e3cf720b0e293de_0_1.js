function(val) {
                    var _ = this._;
                    if (typeof val === "string") {
                        var track = _.tracks[_.selected];
                        if (track) {
                            track.compile(val);
                        } else {
                            _.tracks[_.selected] = new MMLTrack(this, val);
                        }
                    } else if (val instanceof Array) {
                        var typeofval0 = typeof val[0];
                        if ((typeofval0 === "string" || typeofval0 === "number")) {
                            if (typeof val[1] === "string") {
                                var track = _.tracks[val[0]];
                                if (track) {
                                    track.compile(val[1]);
                                } else {
                                    _.tracks[val[0]] = new MMLTrack(this, val[1]);
                                }
                            }
                        }
                    }
                }