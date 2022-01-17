function (callback) {
        var that = this;
        $(this.el).show('fast', function () {
            that.focus();
        });
        return this;
    }