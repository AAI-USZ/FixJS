function deviceReady() {

    //$.mobile.initializePage();
    console.log("deviceready");

    if(typeof sina.weibo == "undefined") {
        console.log("sina.weibo is undefined");
        sina.weibo = {};
        /*
        //var ori_weibo_get = sina.weibo.get;
        sina.weibo.get = function(url, params, success, fail) {
            $.mobile.showPageLoadingMsg("e", "Loading...", true);
            if(success) {
                var ori_success = success;
                success = function(response) {
                    $.mobile.hidePageLoadingMsg();
                    console.log("success");
                    ori_success(response);
                };
            }
            if(fail) {
                var ori_fail = fail;
                fail = function() {
                    $.mobile.hidePageLoadingMsg();
                    console.log("fail");
                    ori_fail();
                };
            }
            //ori_weibo_get(url, params, success, fail);
        };
        */
    }

    sina.ajax.setup("http://tinybo.sinaapp.com/server/proxy.php");
    sina.weibo.get = function(url, params, success, fail) {
            var paramStr = "";
            var paramCount = 0;
            for(var param in params) {
              paramStr += (param + "=" + params[param] + "&");
              paramCount++;
            }
            if(paramCount > 0) {
              paramStr = paramStr.substr(0, paramStr.length - 1);
            }

            var newUrl = url + "?" + paramStr;
            console.log("newUrl: " + newUrl);
            newSuccess = function(status, response) {
                console.log("response: " + response);
                success(response);
            };
            sina.ajax.get(newUrl, newSuccess);
    };
    sina.weibo.post =  function(url, params, success, fail) {
            newSuccess = function(status, response) {
                console.log("response: " + response);
                success(response);
            };
            sina.ajax.post(url, params, newSuccess);
    };

    appRouter = new AppRouter();
    Backbone.history.start({
        //pushState: true
    });
}