function (dir) {
            var manifestPath = path.normalize(path.resolve(extPath, path.join(dir, MANIFEST_FILE))),
                apiDir = path.normalize(path.resolve(extPath, dir)),
                manifest,
                basename;

            if (path.existsSync(manifestPath)) {
                try {
                    // use loadModule function to load manifest so that mocking can be done in tests
                    manifest = packagerUtils.loadModule(manifestPath);
                    basename = apiDir.split(path.sep).pop(); // get extension base name
                    _extensionMap[basename] = manifest;

                    if (manifest.namespace) {
                        _idLookup[manifest.namespace] = basename;
                    } else {
                        // error - manifest.json did not specify namespace property
                        throw localize.translate("EXCEPTION_EXTENSION_MISSING_NAMESPACE_MANIFEST", manifestPath);
                    }
                } catch (e) {
                    // error - manifest.json contains error
                    throw localize.translate("EXCEPTION_EXTENSION_ERROR_PARSING_MANIFEST", manifestPath);
                }
            } else {
                // error - manifest.json not found int extension dir
                throw localize.translate("EXCEPTION_EXTENSION_MISSING_MANIFEST", apiDir);
            }
        }