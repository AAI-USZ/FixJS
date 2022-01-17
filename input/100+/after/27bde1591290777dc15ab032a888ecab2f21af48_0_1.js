function processInvokeTargetsData(data, widgetConfig) {

    if (data["rim:invoke-target"]) {
        widgetConfig["invoke-target"] = data["rim:invoke-target"];

        //If invoke-target is not an array, wrap the invoke-target in an array
        utils.wrapPropertyInArray(widgetConfig, "invoke-target");

        widgetConfig["invoke-target"].forEach(function (invokeTarget) {

            if (invokeTarget.type) {
                invokeTarget.type = invokeTarget.type.toUpperCase();
            }

            if (invokeTarget.filter) {
                utils.wrapPropertyInArray(invokeTarget, "filter");

                invokeTarget.filter.forEach(function (filter) {

                    if (filter["action"]) {
                        utils.wrapPropertyInArray(filter, "action");
                    }

                    if (filter["mime-type"]) {
                        utils.wrapPropertyInArray(filter, "mime-type");
                    }

                    if (filter["property"]) {
                        utils.wrapPropertyInArray(filter, "property");
                    }
                });
            }
        });
    }
}