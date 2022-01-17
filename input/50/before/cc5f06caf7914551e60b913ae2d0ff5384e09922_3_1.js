function (options) {
        this.hub = $.connection.groupHub;
        this.controller = options.controller;

        this.hub.newActivity = this.controller.newActivity;
        //this.hub.userStatusUpdate = this.controller.userStatusUpdate;
        //this.hub.setupOnlineUsers = this.controller.setupOnlineUsers;

        this.hub.debugToLog = this.controller.debugToLog;
    }