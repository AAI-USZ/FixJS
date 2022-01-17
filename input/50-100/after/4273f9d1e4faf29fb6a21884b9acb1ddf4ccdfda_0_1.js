function(h) {
                    if (h['attachmentPoint'].length > 0) {
                        h.swport = _.reduce(h['attachmentPoint'], function(memo, ap) {
                            return memo + ap.switchDPID + "-" + ap.port + " "}, "");
                        //console.log(h.swport);
                        self.add(h, {silent: true});
                    }
                }