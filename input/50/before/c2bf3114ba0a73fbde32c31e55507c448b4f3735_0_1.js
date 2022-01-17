function () {
        var _this = this;

        if (document.readyState == 'complete') {
            this.loadCss();
        } else {
            setTimeout(function () {
                _this.create();
            }, 50);
        }
     }