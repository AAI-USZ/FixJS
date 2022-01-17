function(success, data) {
                            if (success) {
                                // sort widget html and bundles into separate arrays
                                for (var h in data.results) {
                                    if (data.results.hasOwnProperty(h)) {
                                        for (var hh in urls) {
                                            if (data.results[h].url && urls[hh].url && data.results[h].url === urls[hh].url) {
                                                requestedURLsResults.push(data.results[h]);
                                            }
                                        }
                                        for (var hhh in bundles) {
                                            if (data.results[h].url && bundles[hhh].url && data.results[h].url === bundles[hhh].url) {
                                                requestedBundlesResults.push(data.results[h]);
                                            }
                                        }
                                    }
                                }

                                var stylesheets = [];
                                for (var i = 0, j = requestedURLsResults.length; i < j; i++) {
                                    // Current widget name
                                    var widgetName = requestedURLsResults[i].url.split("/")[2];
                                    // Check if widget has bundles
                                    var hasBundles = false;
                                    // Array containing language bundles
                                    var bundleArr = [];
                                    // Local and default bundle
                                    for (var ii = 0, jj = requestedBundlesResults.length; ii < jj; ii++) {
                                        if (widgetName === requestedBundlesResults[ii].url.split("/")[2]) {
                                            hasBundles = true;
                                            if (requestedBundlesResults[ii].url.split("/")[4].split(".")[0] === "default") {
                                                sakai_i18n.data.widgets[widgetName] = sakai_i18n.data.widgets[widgetName] || {};
                                                sakai_i18n.data.widgets[widgetName]["default"] = sakai_i18n.changeToJSON(requestedBundlesResults[ii].body);
                                            } else {
                                                sakai_i18n.data.widgets[widgetName] = sakai_i18n.data.widgets[widgetName] || {};
                                                sakai_i18n.data.widgets[widgetName][current_locale_string] = sakai_i18n.changeToJSON(requestedBundlesResults[ii].body);
                                            }
                                        }
                                    }

                                    // Change messages
                                    var translated_content = "", lastend = 0;
                                    if (hasBundles) {
                                        var expression = new RegExp(".{1}__MSG__(.*?)__", "gm");
                                        while (expression.test(requestedURLsResults[i].body)) {
                                            var replace = RegExp.lastMatch;
                                            var lastParen = RegExp.lastParen;
                                            var quotes = "";

                                            // need to add quotations marks if key is adjacent to an equals sign which means its probably missing quotes - IE
                                            if (replace.substr(0, 2) !== "__") {
                                                if (replace.substr(0, 1) === "=") {
                                                    quotes = '"';
                                                }
                                                replace = replace.substr(1, replace.length);
                                            }
                                            var toreplace;
                                            // check for i18n debug
                                            if (sakai_config.displayDebugInfo === true && sakai_user.data.me.user.locale && sakai_user.data.me.user.locale.language === "lu" && sakai_user.data.me.user.locale.country === "GB") {
                                                toreplace = quotes + replace.substr(7, replace.length - 9) + quotes;
                                                translated_content += requestedURLsResults[i].body.substring(lastend, expression.lastIndex - replace.length) + toreplace;
                                                lastend = expression.lastIndex;
                                            } else {
                                                toreplace = quotes + sakai_i18n.getValueForKey(lastParen, widgetName) + quotes;
                                                translated_content += requestedURLsResults[i].body.substring(lastend, expression.lastIndex - replace.length) + toreplace;
                                                lastend = expression.lastIndex;
                                            }
                                        }
                                        translated_content += requestedURLsResults[i].body.substring(lastend);
                                    } else {
                                        translated_content = sakai_i18n.General.process(requestedURLsResults[i].body, sakai_user.data.me);
                                    }
                                    var ss = sethtmlover(translated_content, widgetsInternal2, widgetName);
                                    for (var s = 0; s < ss.length; s++) {
                                        stylesheets.push(ss[s]);
                                    }
                                }
                                // SAKIII-1524 - IE has a limit of maximum 32 CSS files (link or style tags). When
                                // a lot of widgets are loaded into 1 page, we can easily hit that limit. Therefore,
                                // we adjust the widgetloader to load all CSS files of 1 WidgetLoader pass in 1 style
                                // tag filled with import statements
                                if ($.browser.msie && stylesheets.length > 0) {
                                    var numberCSS = $("head style, head link").length;
                                    // If we have more than 30 stylesheets, we will merge all of the previous style
                                    // tags we have created into the lowest possible number
                                    if (numberCSS >= 30) {
                                        $("head style").each(function(index){
                                            if ($(this).attr("title") && $(this).attr("title") === "sakai_widgetloader") {
                                                $(this).remove();
                                            }
                                        });
                                    }
                                    var allSS = [];
                                    var newSS = document.createStyleSheet();
                                    newSS.title = "sakai_widgetloader";
                                    var totalImportsInCurrentSS = 0;
                                    // Merge in the previously created style tags
                                    if (numberCSS >= 30) {
                                        for (var k in sakaiWidgetsAPI.cssCache) {
                                            if (sakaiWidgetsAPI.cssCache.hasOwnProperty(k)) {
                                                if (totalImportsInCurrentSS >= 30) {
                                                    allSS.push(newSS);
                                                    newSS = document.createStyleSheet();
                                                    newSS.title = "sakai_widgetloader";
                                                    totalImportsInCurrentSS = 0;
                                                }
                                                newSS.addImport(k);
                                                totalImportsInCurrentSS++;
                                            }
                                        }
                                    }
                                    // Add in the stylesheets declared in the widgets loaded
                                    // in the current pass of the WidgetLoader
                                    for (var m = 0, mm = stylesheets.length; m < mm; m++) {
                                        if (totalImportsInCurrentSS >= 30) {
                                            allSS.push(newSS);
                                            newSS = document.createStyleSheet();
                                            newSS.title = "sakai_widgetloader";
                                            totalImportsInCurrentSS = 0;
                                        }
                                        newSS.addImport(stylesheets[m]);
                                    }
                                    allSS.push(newSS);
                                    // Add the style tags to the document
                                    for (var z = 0; z < allSS.length; z++) {
                                        $("head").append(allSS[z]);
                                    }
                                }
                            }
                        }