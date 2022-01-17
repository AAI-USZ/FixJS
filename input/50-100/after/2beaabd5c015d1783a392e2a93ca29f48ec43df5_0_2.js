function()
{
    if (!this.defaultStringBundle)
        this.defaultStringBundle = stringBundleService.createExtensibleBundle("default_strings_firebug");
    return this.defaultStringBundle;
}