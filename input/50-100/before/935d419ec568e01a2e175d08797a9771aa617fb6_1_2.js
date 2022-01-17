function generateLocalizedMetadata(session, config, xmlObject, key) {
    if (config.icon || config.splash) {
        var localeFiles;

        if (path.existsSync(session.sourceDir + "/locales")) {
            localeFiles = wrench.readdirSyncRecursive(session.sourceDir + "/locales");
        }

        generateLocalizedMetadataForSplashScreenIcon(config, key, xmlObject, key === "splash" ? "splashScreens" : key, localeFiles);
    }
}