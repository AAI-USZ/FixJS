function copyExtensions(accessList, session, target, extManager) {
    var extPath = session.conf.EXT,
        copied = {},
        extensions;

    if (path.existsSync(extPath)) {
        extensions = extManager.getAllExtensionsToCopy(accessList);

        extensions.forEach(function (extBasename) {
            var featureId = extManager.getFeatureIdByExtensionBasename(extBasename);

            if (!featureId) {
                // error - feature id not found
            }

            if (!copied.hasOwnProperty(featureId)) {
                copyExtension(session, target, featureId, extBasename);
                copied[featureId] = true;
            }
        });
    }
}