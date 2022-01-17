function(json) {
            /*
             * json
             *  - messages
             *  - online_users_number
             */
            console.log('-> just receiveMessages');
            var _this = this;

            _.each(json.messages, function(message, loop) {
                _this.showMessage(message);
            });

            panelView.updateRoominfo(json.online_users_number);
        }