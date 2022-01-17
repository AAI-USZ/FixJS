function () {
            if (request.readyState === 4) {
                if (request.status === 412) {
                    //Application Webworks.js does not match framework, display error to user.
                    resp = JSON.parse(request.responseText);
                    alert(resp.msg);
                } else if (request.status === 200) {
                    resp = JSON.parse(request.responseText);
                    builder.build(resp.data).into(window);
                    //At this point all of the APIs should be built into the window object
                    //Fire the webworks ready event
                    _webworksReady = true;
                    fireWebworksReadyEvent();
                }
            }
        }