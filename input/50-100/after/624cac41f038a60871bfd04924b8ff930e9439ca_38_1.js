function () {
            var sendMessageUserObj = {};
            sendMessageUserObj.uuid = userId;
            sendMessageUserObj.username = sakai.api.User.getDisplayName(dataCache[userId]);
            sendMessageUserObj.type = "user";
            // initialize the sendmessage-widget
            $(document).trigger('initialize.sendmessage.sakai', [sendMessageUserObj, false, false, null, null, null]);
        }