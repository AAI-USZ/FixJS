function()
{
    WebInspector.SettingsTab.call(this);

    var p = this._appendSection();
    p.appendChild(this._createUserAgentControl());
    if (Capabilities.canOverrideDeviceMetrics)
        p.appendChild(this._createDeviceMetricsControl());
    p.appendChild(this._createGeolocationOverrideControl());
    p.appendChild(this._createCheckboxSetting(WebInspector.UIString("Emulate touch events"), WebInspector.settings.emulateTouchEvents));
}