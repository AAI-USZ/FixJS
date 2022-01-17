function formatParam(url, name, value) {
            var sep = (url.indexOf("?") != -1) ? "&" : "?";
            return sep + name + "=" + value;
        }