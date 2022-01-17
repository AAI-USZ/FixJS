function()
{
    if (WebInspector.settings.deviceMetrics.get())
        this._deviceMetricsChanged();
    WebInspector.settings.deviceMetrics.addChangeListener(this._deviceMetricsChanged, this);
    WebInspector.settings.deviceFitWindow.addChangeListener(this._deviceMetricsChanged, this);
    WebInspector.settings.geolocationOverride.addChangeListener(this._geolocationPositionChanged, this);
    WebInspector.settings.geolocationError.addChangeListener(this._onGeolocationErrorChanged, this);
}