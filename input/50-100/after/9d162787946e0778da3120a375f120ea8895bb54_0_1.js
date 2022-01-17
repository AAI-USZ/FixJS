function (last) {
        
        var that = this;

        return function () {
            return last = that(last);
        };
    }