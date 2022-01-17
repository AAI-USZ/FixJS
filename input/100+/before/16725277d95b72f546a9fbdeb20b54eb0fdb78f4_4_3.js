function(error) {
                if (that.tries < maxTries) {
                    that.tries++;
                    console.trace();
                    console.error("error(" + error.code + "): " + error.message);
                    console.error(
                        "retry(" + that.tries + ") " +
                        that.request.headers.host + that.request.url
                    );
                    setTimeout(that.respondeWithOriginalPage, 500);
                } else {
                    console.error("aborting non asset request after " + that.tries + " tries");
                    that.response.end();
                }
            }