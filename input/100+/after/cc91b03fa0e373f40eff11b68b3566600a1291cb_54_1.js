function(sheet)
{
    // Ignore by the regular method, except for default stylesheets that are
    // used in case there is no other stylesheet.
    if (sheet.defaultStylesheet)
        return false;
    return (sheet.ownerNode && Firebug.shouldIgnore(sheet.ownerNode));
}