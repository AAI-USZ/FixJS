function (session, configObj) {
        var extPath = session.conf.EXT,
            apiDir;

        configObj.accessList.forEach(function (object) {
            if (object.hasOwnProperty("features")) {
                for (var index in object.features) {
                    apiDir = path.resolve(extPath, object.features[index].id);
                    if (!path.existsSync(apiDir)) {
                        logger.warn(localize.translate("EXCEPTION_FEATURE_NOT_FOUND", object.features[index].id));
                        object.features.splice(index, 1);
                    }
                }
            }
        });
    }