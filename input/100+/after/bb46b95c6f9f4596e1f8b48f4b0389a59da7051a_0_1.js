function(anonymous) {
            console.log('-> poll(); this:', this);
            var _this = this,
                data = {};

            if (anonymous)
                data.anonymous = true;

            if (this.lastMessage)
                data.last_message_id = this.lastMessage._id;

            this.connection = $.ajax({
                url: "/chat/messages/updates",
                type: "POST",
                data: data,
                success: function(json) {
                    // console.log('poll json', json);
                    _this.receiveMessages(json);
                },
                error: function(xhr) {
                    // console.log('error, repoll', xhr);

                    if (xhr.statusText == 'abort') {
                        console.log('-> repoll by function');
                        _this.poll();
                    } else {
                        if (xhr.responseText) console.log('Poll error:', $.parseJSON(xhr.responseText).error);

                        _this.errorSleepTime += 1000;
                        panelView.status('Connection interrupted, reconnect in ' + _this.errorSleepTime / 1000 + 's',
                            0, 'warning');
                        setTimeout($.proxy(_this.poll, _this), _this.errorSleepTime);
                    }
                }
            });
        }