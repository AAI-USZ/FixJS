function (access) {
            if (access.uri) {
                if (access.uri !== "WIDGET_LOCAL") {
                    check(access.uri, localize.translate("EXCEPTION_INVALID_ACCESS_URI_NO_PROTOCOL", access.uri))
                        .regex("^[a-zA-Z]+:\/\/");
                    check(access.uri, localize.translate("EXCEPTION_INVALID_ACCESS_URI_NO_URN", access.uri))
                        .notRegex("^[a-zA-Z]+:\/\/$");
                }
            }
            
            if (access.features) {
                // Assert each feature has a proper ID and is not empty
                access.features.forEach(function (feature) {
                    if (!feature) {
                        throw localize.translate("EXCEPTION_INVALID_FEATURE_ID");
                    }
                    check(feature.id, localize.translate("EXCEPTION_INVALID_FEATURE_ID")).notNull().notEmpty();
                });
            }

        }