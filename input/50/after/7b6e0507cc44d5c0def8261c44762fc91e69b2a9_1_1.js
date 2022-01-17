function (event) {
        if (event.which === 13 && !event.shiftKey) {
            if (this.rendered) {
                this.edit();
                return false;
            };
        };
    }