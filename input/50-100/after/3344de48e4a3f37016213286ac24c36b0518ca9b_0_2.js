function () {
        this.options.model.on("add", function (item) {
            this.positionNewChat(item.get('id'));
        }, this);

        this.views = {};
        this.restoreOpenChats();

    }