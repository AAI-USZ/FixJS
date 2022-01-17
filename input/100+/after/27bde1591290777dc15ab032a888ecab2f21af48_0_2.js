function validateConfig(widgetConfig) {

    check(widgetConfig.version, localize.translate("EXCEPTION_INVALID_VERSION"))
        .notNull()
        .regex("^[0-9]{1,3}([.][0-9]{1,3}){2,3}$");
    check(widgetConfig.name, localize.translate("EXCEPTION_INVALID_NAME")).notEmpty();
    check(widgetConfig.author, localize.translate("EXCEPTION_INVALID_AUTHOR")).notNull();
    check(widgetConfig.id, localize.translate("EXCEPTION_INVALID_ID")).regex("^[a-zA-Z][a-zA-Z0-9 ]*[a-zA-Z0-9]$");

    if (widgetConfig.icon) {
        check(widgetConfig.icon, localize.translate("EXCEPTION_INVALID_ICON_SRC")).notNull();
    }

    if (widgetConfig.accessList) {
        widgetConfig.accessList.forEach(function (access) {
            if (access.uri) {
                if (access.uri !== "WIDGET_LOCAL") {
                    check(access.uri, localize.translate("EXCEPTION_INVALID_ACCESS_URI_NO_PROTOCOL", access.uri))
                        .regex("^[a-zA-Z]+:\/\/");
                    check(access.uri, localize.translate("EXCEPTION_INVALID_ACCESS_URI_NO_URN", access.uri))
                        .notRegex("^[a-zA-Z]+:\/\/$");
                }
            }
        });
    }

    if (widgetConfig["invoke-target"]) {

        widgetConfig["invoke-target"].forEach(function (invokeTarget) {

            check(typeof invokeTarget["@"] === "undefined",
                    localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_ID"))
                .equals(false);
            check(invokeTarget["@"].id, localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_ID"))
                .notNull()
                .notEmpty();
            check(invokeTarget.type, localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_TYPE"))
                .notNull()
                .notEmpty()
                .isIn(["APPLICATION", "VIEWER"]);

            if (invokeTarget.filter) {

                invokeTarget.filter.forEach(function (filter) {

                    check(filter["action"] && filter["action"] instanceof Array && filter["action"].length > 0,
                            localize.translate("EXCEPTION_INVOKE_TARGET_ACTION_INVALID"))
                        .equals(true);

                    check(filter["mime-type"] && filter["mime-type"] instanceof Array && filter["mime-type"].length > 0,
                            localize.translate("EXCEPTION_INVOKE_TARGET_MIME_TYPE_INVALID"))
                        .equals(true);

                    if (filter.property) {
                        filter.property.forEach(function (property) {
                            check(property["@"] && property["@"]["var"] && typeof property["@"]["var"] === "string",
                                    localize.translate("EXCEPTION_INVOKE_TARGET_FILTER_PROPERTY_INVALID"))
                                .equals(true);
                            check(property["@"]["var"], localize.translate("EXCEPTION_INVOKE_TARGET_FILTER_PROPERTY_INVALID"))
                                .isIn(["exts", "uris"]);
                        });
                    }
                });
            }
        });
    }
}