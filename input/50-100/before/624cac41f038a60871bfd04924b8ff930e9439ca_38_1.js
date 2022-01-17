function () {
            var sendMessageUserObj = {};
            sendMessageUserObj.uuid = userId;
            sendMessageUserObj.username = sakai.api.User.getDisplayName(dataCache[userId]);
            sendMessageUserObj.type = "user";
            // initialize the sendmessage-widget
            $(window).trigger("initialize.sendmessage.sakai", [sendMessageUserObj, false, false, null, null, null]);
        }