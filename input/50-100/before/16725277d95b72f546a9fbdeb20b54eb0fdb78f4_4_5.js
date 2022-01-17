function(data) {
                                that.soupData = data;
                                that.writeResponseHead();
                                if (data.length > 0) {
                                    options.stats.dataCount[that.request.connection.remoteAddress] += data.length;
                                    that.response.write(data);
                                }
                                that.response.end();
                            }