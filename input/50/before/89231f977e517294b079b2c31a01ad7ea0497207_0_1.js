function(json) {
                    _this.receiveMessages(json);
                    if (json.messages.length > 0)
                        _this.separateMessages(
                            'last message was send on:&nbsp&nbsp' + Utils.getYmdHM(_this.lastMessage.time));
                }