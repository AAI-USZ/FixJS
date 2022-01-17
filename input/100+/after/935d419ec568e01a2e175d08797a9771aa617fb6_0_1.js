function validateSplashScreensIcon(widgetConfig, key) {
    if (widgetConfig[key]) {
        var msg = localize.translate(key === "icon" ? "EXCEPTION_INVALID_ICON_SRC" : "EXCEPTION_INVALID_SPLASH_SRC");

        if (widgetConfig[key].length === 0) {
            // element without src attribute
            throw msg;
        } else {
            widgetConfig[key].forEach(function (src) {
                var msg2 = localize.translate(key === "icon" ? "EXCEPTION_INVALID_ICON_SRC_LOCALES" : "EXCEPTION_INVALID_SPLASH_SRC_LOCALES");

                // check that src attribute is specified and is not empty
                check(src, msg).notNull();

                // check that src attribute does not start with reserved locales folder
                src = src.replace(/\\/g, "/");
                check(src, msg2).notRegex("^" + i18nMgr.LOCALES_DIR + "\/");
            });
        }

    }
}