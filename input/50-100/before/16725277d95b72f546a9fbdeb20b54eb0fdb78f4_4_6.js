function() {
                that.writeResponseHead();
                if (that.soupData.length > 0 && that.request.method != 'HEAD') {
                    var data = that.soupData;
                    options.stats.dataCount[that.request.connection.remoteAddress] += that.soupData.length;
                    that.response.write(data);
                }
                that.response.end();
            }