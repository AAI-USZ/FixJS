function (url, arg1, arg2, arg3, arg4) {
        if (arguments.length === 1) {
            this.openUrl(url, 'get', this.settings);
            return;
        }
        if (arguments.length === 2 && typeof arg1 === 'function') {
            this.onLoadFinished = arg1;
            this.openUrl(url, 'get', this.settings);
            return;
        } else if (arguments.length === 2) {
            this.openUrl(url, arg1, this.settings);
            return;
        } else if (arguments.length === 3 && typeof arg2 === 'function') {
            this.onLoadFinished = arg2;
            this.openUrl(url, arg1, this.settings);
            return;
        } else if (arguments.length === 3) {
            this.openUrl(url, {
                operation: arg1,
                data: arg2
            }, this.settings);
            return;
        } else if (arguments.length === 4) {
            this.onLoadFinished = arg3;
            this.openUrl(url, {
                operation: arg1,
                data: arg2
            }, this.settings);
            return;
        } else if (arguments.length === 5) {
            this.onLoadFinished = arg4;
            this.openUrl(url, {
                operation: arg1,
                data: arg2,
                headers : arg3
            }, this.settings);
            return;
        }
        throw "Wrong use of WebPage#open";
    }