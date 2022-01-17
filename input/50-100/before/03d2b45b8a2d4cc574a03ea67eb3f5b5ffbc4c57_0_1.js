function (item) {
            return ExtensionLoader.loadAllExtensionsInNativeDirectory(
                FileUtils.getNativeBracketsDirectoryPath() + "/extensions/" + item,
                "extensions/" + item
            );
        }