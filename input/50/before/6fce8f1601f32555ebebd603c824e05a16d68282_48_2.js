function (seconds) {
        this.timeout = seconds;
        var self = this;
        setTimeout(onTimeout, this.timeout * 1000);

        function onTimeout() {
            self.elapsed.dispatch();
        }
    }