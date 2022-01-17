function _loadExtensionTests() {
        var bracketsPath = FileUtils.getNativeBracketsDirectoryPath();

        // This returns path to test folder, so convert to src
        bracketsPath = bracketsPath.replace("brackets/test", "brackets/src");

        return Async.doInParallel(["default", "user"], function (dir) {
            return ExtensionLoader.testAllExtensionsInNativeDirectory(
                bracketsPath + "/extensions/" + dir,
                "extensions/" + dir
            );
        });
    }