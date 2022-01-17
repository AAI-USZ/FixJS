function(bundleURI)
{
    // Notice that this category entry must not be persistent in Fx 4.0
    categoryManager.addCategoryEntry("strings_firebug", bundleURI, "", false, true);
    this.stringBundle = null;
}