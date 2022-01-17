function(headers) {
                var newheaders = {};

                for (var i in headers) {
                    newheaders[i] = headers[i];
                }

                if (newheaders.location) {
                    newheaders.location = that.getNewResponseLocationField(newheaders.location);
                }

                newheaders['content-length'] = that.soupData.length;

                return newheaders;
            }