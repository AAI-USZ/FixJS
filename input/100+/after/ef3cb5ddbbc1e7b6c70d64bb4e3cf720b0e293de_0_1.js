function(val) {
                    var _ = this._;
                    if (typeof val === "string") {
                        var track = _.tracks[_.selected];
                        if (track) {
                            track.compile(val);
                        } else {
                            _.tracks[_.selected] = new MMLTrack(this, val);
                        }
                    } else if (val === null) {
                        delete _.tracks[_.selected];
                        
                    } else if (typeof val === "object") {
                        for (var key in val) {
                            var x = val[key], track = _.tracks[key];
                            if (x === null) {
                                delete _.tracks[key];
                            } else {
                                if (track) {
                                    track.compile(x);
                                } else {
                                    _.tracks[key] = new MMLTrack(this, x);
                                }
                            }
                        }
                    }
                }