function (request, sender, sendResponse) {
            var xhr, postData, data, plugin;
console.log(request);
            switch (request.action) {
            case "isEnabled":
                console.log("isEnabled? ==> " + request.tabURL);
                sendResponse({"enabled": tinyHippos.Background.isEnabled(request.tabURL)});
                break;
            case "enable":
                console.log("enabling ==> " + request.tabURL);
                tinyHippos.Background.enable();
                sendResponse();
                break;
            case "userAgent":
                console.log("user agent ==> " + request.data);
                userAgent = request.data;
                break;
            case "version":
                sendResponse(version);
                break;
            case "xhr":
                xhr = new XMLHttpRequest();
                postData = new FormData();
                data = JSON.parse(request.data);

                console.log("xhr ==> " + data.url);

                $.ajax({
                    type: data.method,
                    url: data.url,
                    async: true,
                    data: data.data,
                    success: function (data, status) {
                        sendResponse({
                            code: 200,
                            data: data
                        });
                    },
                    error: function (xhr, status, errorMessage) {
                        sendResponse({
                            code: xhr.status,
                            data: status
                        });
                    }
                });
                break;
            case "services":
                console.log("services", request.data);
                if (request.data === '"start"') {
                    plugin = document.getElementById("pluginRippleBD");
                    if (plugin) {
                        console.log("return from startBD", plugin.startBD(9910));
                        sendResponse();
                    }
                }
                else if (request.data === '"stop"') {
                    xhr = new XMLHTTPRequest();
                    try {
                        xhr.open("GET", "http://127.0.0.1:9910/ripple/shutdown", false);
                        xhr.send();
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                break;
            case "lag":
            case "network":
                // methods to be implemented at a later date
                break;
            default:
                throw {name: "MethodNotImplemented", message: "Requested action is not supported! "};
                break;
            };
        }