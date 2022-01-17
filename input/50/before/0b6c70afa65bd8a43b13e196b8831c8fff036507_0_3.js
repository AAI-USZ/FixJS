function () {
            this.started = true;
            _.each(this.stack, function (message) {
                this.execute(message);
            }.bind(this));
            this.next();
        }