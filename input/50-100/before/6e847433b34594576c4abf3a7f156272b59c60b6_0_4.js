function(json) {
            console.log('-> just receiveMessages');
            var _this = this;
            if (json instanceof Array) {
                // Make sure messages have been sorted by time on the server
                _.each(json, function(message, loop) {
                    _this.showMessage(message);
                });
            } else {
                _this.showMessage(json);
            }

            this.errorSleepTime = 500;
            console.log('-> poll after receiveMessages');
            this.poll();
        }