function (event) {
        if (event.which === 13 && !event.shiftKey) {
            if (that.rendered) {
                that.edit();
                return false;
            };
        };
    }