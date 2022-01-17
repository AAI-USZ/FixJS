function(error) {
                if (that.tries < maxTries) {
                    that.tries++;
                    options.logger.error("soupError, code: " + error.code + ", tries: " + that.tries + "/" + maxTries +
                        ", " + that.request.headers.host + that.request.url, error);
                    setTimeout(that.respondeWithOriginalPage, 500);
                } else {
                    options.logger.error("aborting non asset request after " + that.tries + " tries", error);
                    that.response.end();
                }
            }