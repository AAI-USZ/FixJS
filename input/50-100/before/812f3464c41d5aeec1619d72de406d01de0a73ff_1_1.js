function (applicationId) {
        triggerNode.empty();
        triggerNode.append(utils.createElement("p", {
            "innerHTML": applicationId + " is triggered"
        }));
        triggerNode.show();
    }