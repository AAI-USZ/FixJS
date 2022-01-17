function processIconData(data, widgetConfig, session) {
    //
    // This takes config.xml markup in the form of:
    //
    // <icon src="icon-86.png" />
    // <icon src="icon-150.png" />
    //
    // and turns it into:
    //
    // icon: ["icon-86.png", "icon-150.png"]
    //
    // Folder-based localization now done in i18n-manager
    //
    var default_icon_filename = "default-icon.png",
        default_icon_src = session.conf.DEFAULT_ICON,
        default_icon_dst = path.join(session.sourceDir, default_icon_filename);

    processSplashScreenIconSrc(data, widgetConfig, "icon");

    if (!widgetConfig.icon) {
        fs.copySync(default_icon_src, default_icon_dst);

        widgetConfig["icon"] = [];
        widgetConfig["icon"].push(default_icon_filename);
    }
}