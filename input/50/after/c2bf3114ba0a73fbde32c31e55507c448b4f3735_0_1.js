function () {
        var _this = this;

        if (document.readyState == 'complete') {
            this.parse();
        } else {
            setTimeout(function () {
                _this.create();
            }, 50);
        }
     }