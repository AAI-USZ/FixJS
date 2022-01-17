function generateLocalizedMetadata(session, config, xmlObject, key) {
    if (config.icon || config.splash) {
        var localeFiles;

        if (path.existsSync(session.sourceDir + "/" + LOCALES_DIR)) {
            localeFiles = wrench.readdirSyncRecursive(session.sourceDir + "/" + LOCALES_DIR);
        }

        generateLocalizedMetadataForSplashScreenIcon(config, key, xmlObject, key === "splash" ? "splashScreens" : key, localeFiles);
    }
}