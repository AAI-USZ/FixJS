function() {
    var runPlatformAndBuildTypeTest = function(builder, expectedPlatform, expectedBuildType) {
        g_perBuilderPlatformAndBuildType = {};
        buildInfo = platformAndBuildType(builder);
        var message = 'Builder: ' + builder;
        equal(buildInfo.platform, expectedPlatform, message);
        equal(buildInfo.buildType, expectedBuildType, message);
    }
    runPlatformAndBuildTypeTest('Webkit Win (deps)', 'XP', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Win (deps)(dbg)(1)', 'XP', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Win (deps)(dbg)(2)', 'XP', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Linux (deps)', 'LUCID', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Linux (deps)(dbg)(1)', 'LUCID', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Linux (deps)(dbg)(2)', 'LUCID', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Mac10.6 (deps)', 'SNOWLEOPARD', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Mac10.6 (deps)(dbg)(1)', 'SNOWLEOPARD', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Mac10.6 (deps)(dbg)(2)', 'SNOWLEOPARD', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Win', 'XP', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Win7', 'WIN7', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Win (dbg)(1)', 'XP', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Win (dbg)(2)', 'XP', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Linux', 'LUCID', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Linux 32', 'LUCID', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Linux (dbg)(1)', 'LUCID', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Linux (dbg)(2)', 'LUCID', 'DEBUG');
    runPlatformAndBuildTypeTest('Webkit Mac10.6', 'SNOWLEOPARD', 'RELEASE');
    runPlatformAndBuildTypeTest('Webkit Mac10.6 (dbg)', 'SNOWLEOPARD', 'DEBUG');
    runPlatformAndBuildTypeTest('XP Tests', 'XP', 'RELEASE');
    runPlatformAndBuildTypeTest('Interactive Tests (dbg)', 'XP', 'DEBUG');
    
    g_crossDashboardState.group = '@ToT - webkit.org';
    g_crossDashboardState.testType = 'layout-tests';
    runPlatformAndBuildTypeTest('Chromium Win Release (Tests)', 'XP', 'RELEASE');
    runPlatformAndBuildTypeTest('Chromium Linux Release (Tests)', 'LUCID', 'RELEASE');
    runPlatformAndBuildTypeTest('Chromium Mac Release (Tests)', 'SNOWLEOPARD', 'RELEASE');
    
    // FIXME: These platforms should match whatever we use in the TestExpectations format.
    runPlatformAndBuildTypeTest('Lion Release (Tests)', 'APPLE_LION', 'RELEASE');
    runPlatformAndBuildTypeTest('Lion Debug (Tests)', 'APPLE_LION', 'DEBUG');
    runPlatformAndBuildTypeTest('SnowLeopard Intel Release (Tests)', 'APPLE_SNOWLEOPARD', 'RELEASE');
    runPlatformAndBuildTypeTest('SnowLeopard Intel Leaks', 'APPLE_SNOWLEOPARD', 'RELEASE');
    runPlatformAndBuildTypeTest('SnowLeopard Intel Debug (Tests)', 'APPLE_SNOWLEOPARD', 'DEBUG');
    runPlatformAndBuildTypeTest('GTK Linux 32-bit Release', 'GTK_LINUX', 'RELEASE');
    runPlatformAndBuildTypeTest('GTK Linux 32-bit Debug', 'GTK_LINUX', 'DEBUG');
    runPlatformAndBuildTypeTest('GTK Linux 64-bit Debug', 'GTK_LINUX', 'DEBUG');
    runPlatformAndBuildTypeTest('Qt Linux Release', 'QT_LINUX', 'RELEASE');
    runPlatformAndBuildTypeTest('Windows 7 Release (Tests)', 'APPLE_WIN7', 'RELEASE');
    runPlatformAndBuildTypeTest('Windows XP Debug (Tests)', 'APPLE_XP', 'DEBUG');
    
    // FIXME: Should WebKit2 be it's own platform?
    runPlatformAndBuildTypeTest('SnowLeopard Intel Release (WebKit2 Tests)', 'APPLE_SNOWLEOPARD', 'RELEASE');
    runPlatformAndBuildTypeTest('SnowLeopard Intel Debug (WebKit2 Tests)', 'APPLE_SNOWLEOPARD', 'DEBUG');
    runPlatformAndBuildTypeTest('Windows 7 Release (WebKit2 Tests)', 'APPLE_WIN7', 'RELEASE');    
}