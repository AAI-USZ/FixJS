function (invokeTarget) {
            if (invokeTarget.type && !packagerUtils.isEmpty(invokeTarget.type)) {
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
        }