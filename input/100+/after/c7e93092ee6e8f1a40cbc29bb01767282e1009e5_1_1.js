function (configObj) {
        //validate session Object
        packagerValidator.validateSession(session, configObj);
        //validage configuration object        
        packagerValidator.validateConfig(session, configObj, extManager);
        
        //generate user.js
        logger.info(localize.translate("PROGRESS_GEN_OUTPUT"));
        //Adding debuEnabled property to user.js. Framework will enable/disable WebInspector based on that variable.
        configObj.debugEnabled = session.debug;
        packagerUtils.writeFile(path.join(session.sourcePaths.LIB, "config"), "user.js", "module.exports = " + JSON.stringify(configObj, null, "    ") + ";");
        //Write manifest map at lib/manifest.js for extensions to reference each other
        packagerUtils.writeFile(session.sourcePaths.LIB, "manifest.js", "module.exports = " + JSON.stringify(extManager.getExtensionMap(), null, "    ") + ";");

        barBuilder.build(session, configObj, extManager, function (code) {
            fileManager.cleanSource(session);

            if (code === 0) {
                logger.info(localize.translate("PROGRESS_COMPLETE"));
            }
        });
    }