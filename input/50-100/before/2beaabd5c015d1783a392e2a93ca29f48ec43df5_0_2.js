function()
{
    if (!this.defaultStringBundle)
    {
        var chromeRegistry = Cc["@mozilla.org/chrome/chrome-registry;1"].
            getService(Ci.nsIChromeRegistry);

        var uri = Services.io.newURI("chrome://firebug/locale/firebug.properties", "UTF-8", null);
        var fileURI = chromeRegistry.convertChromeURL(uri).spec;
        var parts = fileURI.split("/");
        parts[parts.length - 2] = DEFAULT_LOCALE;
        this.defaultStringBundle = stringBundleService.createBundle(parts.join("/"));
    }
    return this.defaultStringBundle;
}