function (applicationId) {
        if (timeId !== undefined)
            clearTimeout(timeId);
        triggerNode.empty();
        triggerNode.append(utils.createElement("p", {
            "innerHTML": applicationId + " is triggered"
        }));
        triggerNode.show();
        timeId = setTimeout("jQuery('#trigger-alarm-id').empty();", 10000);// Comments will disappear after 10s
    }