function (item, x, y) {
            var view = new xmppchat.ChatBoxView({
                model: item
            });
            this.positionNewChatBox(view.render());
            this.views[item.get('jid')] = view.show();
        }