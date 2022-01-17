function(headers) {
                var newheaders = JSON.parse(JSON.stringify(headers));

                if (newheaders.location) {
                    newheaders.location = that.getNewResponseLocationField(newheaders.location);
                }

                var enc = that.getCorrectResponseCompression();
                if (enc) {
                    newheaders['content-encoding'] = enc;
                } else if (newheaders.hasOwnProperty('content-encoding')) {
                    delete newheaders['content-encoding'];
                }

                newheaders['content-length'] = that.soupData.length;

                return newheaders;
            }