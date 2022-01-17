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
                        }