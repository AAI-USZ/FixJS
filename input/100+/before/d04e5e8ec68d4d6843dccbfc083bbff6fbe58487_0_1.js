function (elt) {
                var isWidget = elt.isWidget = (elt.nsUri == WIDGETS_NS);
                var name = elt.name;
                var attrs = elt.attrs;
                /*
                * ASSERTION # ta-ACCJfDGwDQ
                * If the root element is not a widget element in the widget namespace,
                * then the user agent MUST terminate this algorithm and treat this
                * widget package as an invalid widget package.
                */
                if (name != 'widget' || !isWidget) {
                    parser.emit('error', new Error('ta-ACCJfDGwDQ'));
                    return;
                }
                elt.isValid = true;

                /* do widget attrs */
                if ('dir' in attrs) {
                    processDirAttr(elt);
                }
                var dir = elt.nsAttrs.dir ? elt.nsAttrs.dir.value : BidiUtil.DIR_NONE;

                if ('defaultlocale' in attrs) {
                    /*
                    * ASSERTION # ta-defaultlocale-ignore
                    * If the default locale is in error or an empty string or already
                    * contained by the user agent locales list, then the user agent MUST
                    * ignore the defaultlocale attribute.
                    *
                    * ASSERTION # ta-defaultlocale-process
                    * If potential default locale is a valid language tag and the user
                    * agent locales does not contain the value of default locale, the
                    * user agent MUST prepend the value of potential default locale into
                    * the the user agent locales list as the second-last item (i.e., at
                    * position length - 1).
                    */
                    var defaultLocale = processTextAttr(attrs.defaultlocale);
                    if (defaultLocale.length == 0) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-defaultlocale-ignore#empty", "discarding empty defaultlocale");
                    } else if (ManagerUtils.containsValue(userAgentLocales, defaultLocale)) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-defaultlocale-ignore#duplicate", "discarding defaultlocale, already included");
                    } else if (!LanguageTag.getSubTags(defaultLocale)) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-defaultlocale-ignore#invalid", "ignoring invalid defaultlocale");
                    } else {
                        Logger.logAction(Logger.LOG_MINOR, "ta-defaultlocale-process", "adding defaultlocale");
                        userAgentLocales.push(defaultLocale);
                        widgetConfig.defaultLocale = defaultLocale;
                    }
                }
                processingResult.localisedFileMapping = new LocalisedFileMapping(res, userAgentLocales);

                if ('id' in attrs) {
                    /*
                    * ASSERTION # ta-RawAIWHoMs
                    * If the id attribute is used, then let id be the result of applying
                    * the rule for getting a single attribute value to the id attribute.
                    * If id is a valid IRI, then let widget id be the value of the id.
                    * If the id is in error, then the user agent MUST ignore the attribute.
                    */
                    var id = processUriAttr(attrs.id);
                    if (id) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-RawAIWHoMs", "set widgetId");
                        widgetConfig.id = id.href;
                    } else {
                        Logger.logAction(Logger.LOG_MINOR, "ta-RawAIWHoMs", "ignoring missing or invalid id");
                    }
                }

                if ('version' in attrs) {
                    /*
                    * ASSERTION # ta-VerEfVGeTc
                    * If the version attribute is used, then let version value be the
                    * result of applying the rule for getting a single attribute value
                    * to the version attribute. If the version is an empty string, then
                    * the user agent MUST ignore the attribute; otherwise, let widget
                    * version be the value of version value.
                    */
                    var str = processTextAttr(attrs.version);
                    if (str) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-VerEfVGeTc", "set version");
                        widgetConfig.version = new VersionString(str, dir);
                    } else {
                        Logger.logAction(Logger.LOG_MINOR, "ta-VerEfVGeTc", "ignoring empty version string");
                    }
                }

                if ('height' in attrs) {
                    /*
                    * ASSERTION # ta-BxjoiWHaMr
                    * If the height attribute is used, then let normalized height be the
                    * result of applying the rule for parsing a non-negative integer to
                    * the value of the attribute. If the normalized height is not in error
                    * and greater than 0, then let widget height be the value of normalized
                    * height. If the height attribute is in error, then the user agent MUST
                    * ignore the attribute.
                    */
                    var height = processNonNegativeIntAttr(attrs.height);
                    if (height == -1) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-BxjoiWHaMr", "ignoring invalid widgetHeight");
                    } else {
                        Logger.logAction(Logger.LOG_MINOR, "ta-BxjoiWHaMr", "set widgetHeight");
                        widgetConfig.height = height;
                    }
                }

                if ('width' in attrs) {
                    /*
                    * ASSERTION # ta-BxjoiWHaMr
                    * If the height attribute is used, then let normalized height be the
                    * result of applying the rule for parsing a non-negative integer to
                    * the value of the attribute. If the normalized height is not in error
                    * and greater than 0, then let widget height be the value of normalized
                    * height. If the height attribute is in error, then the user agent MUST
                    * ignore the attribute.
                    */
                    var width = processNonNegativeIntAttr(attrs.width);
                    if (width == -1) {
                        Logger.logAction(Logger.LOG_MINOR, "ta-UScJfQHPPy", "ignoring invalid widgetWidth");
                    } else {
                        Logger.logAction(Logger.LOG_MINOR, "ta-UScJfQHPPy", "set widgetWidth");
                        widgetConfig.width = width;
                    }
                }

                if ('viewmodes' in attrs) {
                    /*
                    * ASSERTION # ta-viewmodes
                    * If the viewmodes attribute is used, then the user agent MUST let
                    * viewmodes list be the result of applying the rule for getting a
                    * list of keywords from an attribute:
                    */
                    var viewmodes = processKeywordListAttr(attrs.viewmodes);
                    if (viewmodes) {
                        var allSupportedModes = config.capabilities.viewModes;
                        var supportedModes = [];
                        for (var i in viewmodes) {
                            if (ManagerUtils.containsValue(allSupportedModes, viewmodes[i]))
                                supportedModes.push(viewmodes[i]);
                        }
                        Logger.logAction(Logger.LOG_MINOR, "ta-viewmodes", "set widgetWindowModes");
                        widgetConfig.viewmodes = supportedModes;
                    }
                }
            }