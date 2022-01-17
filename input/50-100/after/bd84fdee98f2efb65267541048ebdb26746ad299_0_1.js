function nonChromiumPlatform(builderNameUpperCase)
{
    if (stringContains(builderNameUpperCase, 'LION'))
        return 'APPLE_LION';
    if (stringContains(builderNameUpperCase, 'SNOWLEOPARD'))
        return 'APPLE_SNOWLEOPARD';
    if (stringContains(builderNameUpperCase, 'WINDOWS 7'))
        return 'APPLE_WIN7';
    if (stringContains(builderNameUpperCase, 'WINDOWS XP'))
        return 'APPLE_XP';
    if (stringContains(builderNameUpperCase, 'GTK LINUX'))
        return 'GTK_LINUX';
    if (stringContains(builderNameUpperCase, 'QT LINUX'))
        return 'QT_LINUX';
}