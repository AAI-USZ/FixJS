function chromiumPlatform(builderNameUpperCase)
{
    if (stringContains(builderNameUpperCase, 'MAC')) {
        if (stringContains(builderNameUpperCase, '10.7'))
            return 'LION';
        // The webkit.org 'Chromium Mac Release (Tests)' bot runs SnowLeopard.
        return 'SNOWLEOPARD';
    }
    if (stringContains(builderNameUpperCase, 'WIN7'))
        return 'WIN7';
    if (stringContains(builderNameUpperCase, 'VISTA'))
        return 'VISTA';
    if (stringContains(builderNameUpperCase, 'WIN') || stringContains(builderNameUpperCase, 'XP'))
        return 'XP';
    if (stringContains(builderNameUpperCase, 'LINUX'))
        return 'LUCID';
    // The interactive bot is XP, but doesn't have an OS in it's name.
    if (stringContains(builderNameUpperCase, 'INTERACTIVE'))
        return 'XP';
}