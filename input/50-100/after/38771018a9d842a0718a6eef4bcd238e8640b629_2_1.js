function()
{
    if (WebInspector.settings.deviceMetrics.get())
        this._deviceMetricsChanged();
    WebInspector.settings.deviceMetrics.addChangeListener(this._deviceMetricsChanged, this);
    WebInspector.settings.deviceFitWindow.addChangeListener(this._deviceMetricsChanged, this);
}