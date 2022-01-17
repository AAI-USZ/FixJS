function processIconData(data, widgetConfig) {
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
    processSplashScreenIconSrc(data, widgetConfig, "icon");
}