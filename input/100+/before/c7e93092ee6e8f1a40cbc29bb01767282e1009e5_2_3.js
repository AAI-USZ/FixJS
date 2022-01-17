function processResult(data, session) {
    var widgetConfig = {};

    processWidgetData(data, widgetConfig, session);
    processIconData(data, widgetConfig, session);
    processAuthorData(data, widgetConfig);
    processLicenseData(data, widgetConfig);
    processContentData(data, widgetConfig);
    processOrientationData(data, widgetConfig);
    processPermissionsData(data, widgetConfig);
    processInvokeTargetsData(data, widgetConfig);
    processSplashScreenData(data, widgetConfig);

    widgetConfig.name = data.name;
    widgetConfig.description = data.description;
    widgetConfig.configXML = "config.xml";

    //validate the widgetConfig
    validateConfig(widgetConfig);
    
    //special handling for version and grabbing the buildId if specified (4rth number)
    processVersion(widgetConfig);
    
    //if --buildId was specified, it takes precedence
    processBuildID(widgetConfig, session);

    return widgetConfig;
}