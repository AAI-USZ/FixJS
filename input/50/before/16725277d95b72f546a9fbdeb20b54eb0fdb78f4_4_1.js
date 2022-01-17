function() {
                console.error("aborting non asset request due to timeout");
                that.proxy_request.abort();
                that.response.end();
            }