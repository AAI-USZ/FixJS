function(inputHTML) {

                if (inputHTML === "") {
                    return "";
                }

                // Filter which runs through every url in inputHTML
                var filterUrl = function(url) {

                    // test for javascript in the URL and remove it
                    try {
                        var testUrl = decodeURIComponent(url.replace(/\s+/g, ""));
                        var js = "javascript"; // for JSLint to be happy, this needs to be broken up
                        js += ":;";
                        var jsRegex = new RegExp("^(.*)javascript:(.*)+$");
                        var vbRegex = new RegExp("^(.*)vbscript:(.*)+$");
                        if ((jsRegex.test(testUrl) || vbRegex.test(testUrl)) && testUrl !== js) {
                            url = null;
                        } else if (testUrl !== js) {
                            // check for utf-8 unicode encoding without semicolons
                            testUrl = testUrl.replace(/&/g, ";&");
                            testUrl = testUrl.replace(";&", "&") + ";";

                            var nulRe = /\0/g;
                            testUrl = html.unescapeEntities(testUrl.replace(nulRe, ''));

                            if (jsRegex.test(testUrl) || vbRegex.test(testUrl)) {
                                url = null;
                            }
                        }
                    } catch (err){
                        debug.error("Error occured when decoding URI Component");
                    }

                    return url;

                };

                // Filter which runs through every name id and class
                var filterNameIdClass = function(nameIdClass) {

                    return nameIdClass;

                };

                html4.ELEMENTS["video"] = 0;
                html4.ATTRIBS["video::src"] = 0;
                html4.ATTRIBS["video::class"] = 0;
                html4.ATTRIBS["video::autoplay"] = 0;
                html4.ATTRIBS["li::data-sakai-ref"] = 0;
                html4.ATTRIBS["li::data-sakai-path"] = 0;
                html4.ATTRIBS["span::sakai-entityid"] = 0;
                html4.ATTRIBS["button::sakai-entityid"] = 0;
                html4.ATTRIBS["button::sakai-entityname"] = 0;
                html4.ATTRIBS["button::sakai-entitytype"] = 0;
                html4.ATTRIBS["button::sakai-entitypicture"] = 0;
                html4.ATTRIBS["button::entitypicture"] = 0;
                html4.ATTRIBS["div::sakai-worldid"] = 0;
                html4.ATTRIBS["a::data-reset-hash"] = 0;
                html4.ATTRIBS["a::aria-haspopup"] = 0;
                html4.ATTRIBS["a::role"] = 0;
                html4.ATTRIBS["ul::aria-hidden"] = 0;
                html4.ATTRIBS["ul::role"] = 0;

                /**
                 * Remove expressions from a CSS style (only an issue in IE)
                 * @param {String} cssStyle The CSS style we want to remove expressions from
                 * @return {String} A CSS style that doesn't contain an expression
                 */
                var removeExpression = function(cssStyle) {

                    // Sometimes cssStyle will be undefined/null
                    // if that is the case, we just return it
                    if (!cssStyle) {
                        return cssStyle;
                    }

                    // We first need to filter out all the comments
                    // since we also need to catch expr/*XSS*/ession
                    var regex = /\/\*.+?\*\//g;
                    cssStyle = cssStyle.replace(regex, '');

                    // If we encounter an expression, we remove the complete CSS style
                    regex = /expression\(/g;
                    if (cssStyle.search(regex) !== -1) {
                        cssStyle = '';
                    }
                    return cssStyle;
                };

                // A slightly modified version of Caja's sanitize_html function to allow style="display:none;"
                var sakaiHtmlSanitize = function(htmlText, opt_urlPolicy, opt_nmTokenPolicy) {
                    var out = [];
                    html.makeHtmlSanitizer(
                        function sanitizeAttribs(tagName, attribs) {
                            for (var i = 0; i < attribs.length; i += 2) {
                                var attribName = attribs[i];
                                var value = attribs[i + 1];
                                var atype = null, attribKey;
                                if (html4.ATTRIBS.hasOwnProperty(tagName + '::' + attribName)) {
                                    attribKey = tagName + '::' + attribName;
                                    atype = html4.ATTRIBS[attribKey];
                                } else if (html4.ATTRIBS.hasOwnProperty('*::' + attribName)) {
                                    attribKey = '*::' + attribName;
                                    atype = html4.ATTRIBS[attribKey];
                                } else if (attribName.indexOf('data-') === 0) {
                                    atype = html4.atype.IDREFS;
                                }
                                if (atype !== null) {
                                    switch (atype) {
                                        case html4.atype.SCRIPT:
                                        case html4.atype.STYLE:
                                            var accept = ["color", "display", "background-color", "font-weight", "font-family",
                                                          "padding", "padding-left", "padding-right", "text-align", "font-style",
                                                          "text-decoration", "border", "visibility", "font-size", "width"];
                                            var sanitizedValue = "";
                                            if (value){
                                                var vals = value.split(";");
                                                for (var attrid = 0; attrid < vals.length; attrid++){
                                                    var attrValue = $.trim(vals[attrid].split(":")[0]).toLowerCase();
                                                    if ($.inArray(attrValue, accept) !== -1){
                                                        sanitizedValue += removeExpression(vals[i]);
                                                    }
                                                }
                                                if (!sanitizedValue) {
                                                    value = null;
                                                }
                                            } else {
                                                value = sanitizedValue;
                                            }
                                            break;
                                        case html4.atype.IDREF:
                                        case html4.atype.IDREFS:
                                        case html4.atype.GLOBAL_NAME:
                                        case html4.atype.LOCAL_NAME:
                                        case html4.atype.CLASSES:
                                            value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                                            break;
                                        case html4.atype.URI:
                                            value = opt_urlPolicy && opt_urlPolicy(value);
                                            break;
                                        case html4.atype.URI_FRAGMENT:
                                            if (value && '#' === value.charAt(0)) {
                                                value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
                                                if (value) {
                                                    value = '#' + value;
                                                }
                                            } else {
                                                value = null;
                                            }
                                            break;
                                    }
                                } else {
                                    value = null;
                                }
                                attribs[i + 1] = value;
                            }
                            return attribs;
                        })(htmlText, out);
                    return out.join('');
                };

                // Call a slightly modified version of Caja's sanitizer
                return sakaiHtmlSanitize(inputHTML, filterUrl, filterNameIdClass);

            }