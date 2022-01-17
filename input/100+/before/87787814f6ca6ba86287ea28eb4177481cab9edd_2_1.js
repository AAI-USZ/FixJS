function (request, sender, sendResponse) {
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
                console.log("user agent ==> " + userAgent);
                userAgent = request.data;
                break;
            case "version":
                sendResponse(version);
                break;
            case "xhr":
                var xhr = new XMLHttpRequest(),
                    postData = new FormData(),
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
            default:
                throw {name: "MethodNotImplemented", message: "Requested action is not supported!"};
                break;
            };
        }