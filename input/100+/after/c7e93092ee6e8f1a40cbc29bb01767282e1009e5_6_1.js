function (object) {
            if (object.hasOwnProperty("features")) {
                for (var index in object.features) {
                    extBasename = extManager.getExtensionBasenameByFeatureId(object.features[index].id);
                    apiDir = path.resolve(extPath, extBasename);
                    if (!extBasename || !path.existsSync(apiDir)) {
                        logger.warn(localize.translate("EXCEPTION_FEATURE_NOT_FOUND", object.features[index].id));
                        object.features.splice(index, 1);
                    }
                }
            }
        }