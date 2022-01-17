function (request, sender, sendResponse) {
            var uri = location.href;
            switch (request.action) {
            case "enable":
                break;
            case "disable":
                localStorage.removeItem("tinyhippos-enabled-uri");
                //HACK: ummm .... I am sorry
                uri = uri.replace(/enableripple=[^&]*[&]?/i, "").replace(/[\?&]*$/, "");
                break;

            default:
                throw {name: "MethodNotImplemented", message: "Requested action is not supported!"};
            }

            sendResponse({});
            location.href = uri;
        }