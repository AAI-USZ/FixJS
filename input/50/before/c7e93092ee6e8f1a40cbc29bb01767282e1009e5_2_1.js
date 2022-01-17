function (err, result) {
            if (err) {
                logger.error(localize.translate("EXCEPTION_PARSING_XML"));
                fileManager.cleanSource(session);
            } else {
                callback(processResult(result, session));
            }
        }