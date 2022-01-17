function _initExtensions() {
        // allow unit tests to override which plugin folder(s) to load
        var paths = params.get("extensions") || "default,user";
        
        return Async.doInParallel(paths.split(","), function (item) {
            return ExtensionLoader.loadAllExtensionsInNativeDirectory(
                FileUtils.getNativeBracketsDirectoryPath() + "/extensions/" + item,
                "extensions/" + item
            );
        });
    }