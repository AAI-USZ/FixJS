function()
    {
        var metrics = WebInspector.UserAgentSupport.DeviceMetrics.parseSetting(WebInspector.settings.deviceMetrics.get());
        if (metrics.isValid())
            PageAgent.setDeviceMetricsOverride(metrics.width, metrics.height, metrics.fontScaleFactor, WebInspector.settings.deviceFitWindow.get());
    }