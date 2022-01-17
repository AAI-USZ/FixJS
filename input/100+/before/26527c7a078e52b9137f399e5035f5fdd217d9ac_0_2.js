function(method, model, options) {
        $.mobile.showPageLoadingMsg("e", "Loading...", true);
        options || (options = {});

        var key, now, timestamp, refresh;
        key = this.getKey();
        if(key) {
            now = new Date().getTime();
            timestamp = localStorage.getItem(key + ":timestamp");
            refresh = options.forceRefresh;
            if(refresh || !timestamp || ((now - timestamp) > this.constants.maxRefresh)) {
                try {
                  sina.weibo.get(options.url, options.data, function(response) {
                    console.log("sync success");

                    localStorage.setItem(key, response);

                    var now = new Date().getTime();
                    localStorage.setItem(key + ":timestamp", now);

                    options.success(JSON.parse(response));
                    $.mobile.hidePageLoadingMsg();
                  }, function(response) {
                    console.log('error: ' + response);
                    $.mobile.hidePageLoadingMsg();
                  });
                } catch (e) {
                  console.log(e);
                }
            } else {
                // provide data from local storage instead of a network call
                var data = localStorage.getItem(key);
                // simulate a normal async network call
                setTimeout(function(){
                    options.success(JSON.parse(data));
                    $.mobile.hidePageLoadingMsg();
                }, 0);
            }
        }
    }