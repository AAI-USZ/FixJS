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
}