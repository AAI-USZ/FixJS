function (feature) {
                        extBasename = _idLookup[feature.id];

                        if (extBasename) {
                            extensions.push(extBasename);
                        } else {
                            // error - not found in registry
                            throw localize.translate("EXCEPTION_FEATURE_NOT_FOUND", feature);
                        }
                    }