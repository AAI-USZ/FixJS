function(message) {
            /*
             * message
             *  - username
             *  - content
             *  - time
             *  - datetime
             *
             *  - hourtime (extra)
             *  - domId (extra)
             */
            var lastMessage = this.lastMessage,
                date = new Date(message.time * 1000),
                hourtime = date.getHours() + ':' + date.getMinutes();

            function getYmdHM(time) {
                var dt = new Date(time * 1000);
                // console.log('dt', dt, typeof dt);
                var l = [dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getHours(), dt.getMinutes()],
                    s = '';
                _.each(l, function(i) {
                    s += l.toString();
                });
                return s;
            }

            var needDialog = true, dialog$,
                message$,
                messageContext = {
                    content: message.content,
                    hourtime: hourtime
                };

            if (lastMessage) {
                if (message.username == lastMessage.username) {
                    needDialog = false;
                    if (getYmdHM(message.time) == getYmdHM(lastMessage.time))
                        delete messageContext.hourtime;
                }
            }

            if (needDialog) {
                dialog$ = $.tmpl(this.dialog_tmpl, {
                    username: message.username,
                    color: message.color
                });
                // if (lastMessage)
                //     dialog$.addClass('split');
            }

            message$ = $.tmpl(this.message_tmpl, messageContext);

            console.log('dialog$', dialog$);
            console.log('message$', message$);
            if (dialog$) {
                dialog$.find('.messages').append(message$);
                this.chatsBody$.append(dialog$);
            } else {
                this.$('.dialog:last').find('.messages').append(message$);
            }
            this.$('.chats').animate({scrollTop: this.$('.chats').height()}, 300);

            this.lastMessage = message;
        }