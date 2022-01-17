function(id, showSettings, context, widgetData, widgetDataPassthrough, callback) {
                // Configuration variables
                var widgetNameSpace = "sakai_global";
                var widgetSelector = ".widget_inline";

                // Help variables
                var widgetsInternal = {}, settings = false;
                widgetData = widgetData || {};

                /**
                 * Inform the widget that is is loaded and execute the main JavaScript function
                 * If the widget name is "createsite", then the function sakai.createsite will be executed.
                 * @param {String} widgetname The name of the widget
                 */
                var informOnLoad = function(widgetname){
                    var doDelete;
                    // Check if the name of the widget is inside the widgets object.
                    if (widgetsInternal[widgetname] && widgetsInternal[widgetname].length > 0){

                        // Run through all the widgets with a specific name
                        for (var i = 0, j = widgetsInternal[widgetname].length; i<j; i++){
                            widgetsInternal[widgetname][i].done++;

                            if (widgetsInternal[widgetname][i].done === widgetsInternal[widgetname][i].todo){
                                // Save the placement in the widgets variable
                                sakaiWidgetsAPI.widgetLoader.widgets[widgetsInternal[widgetname][i].uid] = {
                                    "placement": widgetsInternal[widgetname][i].placement + widgetsInternal[widgetname][i].uid + "/" + widgetname,
                                    "name" : widgetname,
                                    "widgetData": widgetsInternal[widgetname][i].widgetData
                                };
                                // Run the widget's main JS function
                                var initfunction = window[widgetNameSpace][widgetname];
                                var historyState = sakaiWidgetsAPI.handleHashChange(widgetname);
                                initfunction(widgetsInternal[widgetname][i].uid, settings, widgetsInternal[widgetname][i].widgetData ? $.extend(true, {}, widgetsInternal[widgetname][i].widgetData) : false, historyState);
                                if ($.isFunction(widgetsInternal[widgetname][i].callback)) {
                                    widgetsInternal[widgetname][i].callback();
                                }

                                // Send out a "loaded" event for this widget
                                $(window).trigger(widgetname + "_loaded", [widgetsInternal[widgetname][i].uid]);

                                doDelete = true;
                            }
                        }

                        // Remove the widget from the widgets object (clean up)
                        if (doDelete){
                            delete widgetsInternal[widgetname];
                        }
                    }
                };

                /**
                 * Locate a tag and remove it from the content
                 * @param {String} content The complete content of a file (e.g. <div>...)
                 * @param {String} tagName The name of the tag you want to remove (link/script)
                 * @param {String} URLIdentifier The part that identifies the URL (href/src)
                 */
                var locateTagAndRemove = function(content, tagName, URLIdentifier){
                    var returnObject = {
                        URL : [],
                        content : content
                    };
                    var regexp = new RegExp('<'+tagName+'.*?'+URLIdentifier+'\\s?=\\s?["|'+'\''+']([^"]*)["|'+'\''+'].*/.*?>', "gi");
                    var regexp_match_result = regexp.exec(content);
                    while (regexp_match_result !== null) {
                        returnObject.URL[returnObject.URL.length] = regexp_match_result[1]; // value of URLIdentifier attrib
                        returnObject.content = returnObject.content.replace(regexp_match_result[0],""); // whole tag
                        regexp_match_result = regexp.exec(content);
                    }
                    return returnObject;
                };

                var sethtmlover = function(content,widgets,widgetname){

                    var CSSTags = locateTagAndRemove(content, "link", "href");
                    content = CSSTags.content;
                    var stylesheets = [];

                    for (var i = 0, j = CSSTags.URL.length; i<j; i++) {
                        // SAKIII-1524 - Instead of loading all of the widget CSS files independtly,
                        // we collect all CSS file declarations from all widgets in the current pass
                        // of the WidgetLoader. These will then be loaded in 1 go.
                        if ($.browser.msie && !sakaiWidgetsAPI.cssCache[CSSTags.URL[i]]) {
                            stylesheets.push(CSSTags.URL[i]);
                            sakaiWidgetsAPI.cssCache[CSSTags.URL[i]] = true;
                        } else {
                            sakai_util.include.css(CSSTags.URL[i]);
                        }
                    }

                    var JSTags = locateTagAndRemove(content, "script", "src");
                    content = JSTags.content;

                    for (var widget = 0, k = widgetsInternal[widgetname].length; widget < k; widget++){
                        var container = $("<div>");
                        container.html(content);
                        $("#" + widgetsInternal[widgetname][widget].uid).append(container);

                        // Set up draggable/droppable containers in the widget HTML if there are any
                        if($(".s3d-droppable-container", container).length){
                            sakai_util.Droppable.setupDroppable({}, container);
                        }
                        if($(".s3d-draggable-container", container).length){
                            sakai_util.Draggable.setupDraggable({}, container);
                        }

                        widgetsInternal[widgetname][widget].todo = JSTags.URL.length;
                        widgetsInternal[widgetname][widget].done = 0;
                    }

                    for (var JSURL = 0, l = JSTags.URL.length; JSURL < l; JSURL++){
                        sakai_util.include.js(JSTags.URL[JSURL]);
                    }

                    return stylesheets;

                };

                /**
                 * Load the files that the widget needs (HTML/CSS and JavaScript)
                 * @param {Object} widgets
                 * @param {Object} batchWidgets A list of all the widgets that need to load
                 */
                var loadWidgetFiles = function(widgetsInternal2, batchWidgets){
                    var urls = [];
                    var requestedURLsResults = [];
                    var requestedBundlesResults = [];

                    for(var k in batchWidgets){
                        if(batchWidgets.hasOwnProperty(k)){
                            var urlItem = {
                                "url" : k,
                                "method" : "GET"
                            };
                            urls[urls.length] = urlItem;
                        }
                    }

                    if(urls.length > 0){
                        var current_locale_string = sakai_i18n.getUserLocale();
                        var bundles = [];
                        for (var i = 0, j = urls.length; i<j; i++) {
                            var jsonpath = urls[i].url;
                            var widgetname = batchWidgets[jsonpath];
                            if ($.isPlainObject(sakai.widgets[widgetname].i18n)) {
                                if (sakai.widgets[widgetname].i18n["default"]){
                                    var bundleItem = {
                                        "url" : sakai.widgets[widgetname].i18n["default"].bundle,
                                        "method" : "GET"
                                    };
                                    bundles.push(bundleItem);
                                }
                                if (sakai.widgets[widgetname].i18n[current_locale_string]) {
                                    var item1 = {
                                        "url" : sakai.widgets[widgetname].i18n[current_locale_string].bundle,
                                        "method" : "GET"
                                    };
                                    bundles.push(item1);
                                }
                            }
                        }

                        var urlsAndBundles = urls.concat(bundles);
                        sakai_serv.batch(urlsAndBundles, function(success, data) {
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
                                            if (requestedBundlesResults[ii].url === sakai.widgets[widgetName].i18n['default'].bundle) {
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
                        });
                    }
                };

                /**
                 * Insert the widgets into the page
                 * @param {String} containerId The id of the container element
                 * @param {Boolean} showSettings Show the settings for the widget
                 * @param {Object} widgetData Widget data associated to the loaded widgets
                 * @param {String} context The context of the widget (e.g. siteid)
                 */
                var locateWidgets = function(containerId, showSettings, widgetData, context, callback) {

                    // Use document.getElementById() to avoid jQuery selector escaping issues with '/'
                    var el = containerId ? document.getElementById(containerId) : $(document.body);

                    // Array of jQuery objects that contains all the elements in the with the widget selector class.
                    var divarray = $(widgetSelector, el);

                    // Check if the showSettings variable is set, if not set the settings variable to false
                    settings = showSettings || false;

                    // Array that will contain all the URLs + names of the widgets that need to be fetched with batch get
                    var batchWidgets = [];

                    // Run over all the elements and load them
                    for (var i = 0, j = divarray.length; i < j; i++){
                        var id = divarray[i].id;
                        var split = id.split("_");
                        var widgetname = split[1];

                        // Set the id for the container of the widget
                        var widgetid;
                        if (split[2]){
                            widgetid = split[2];
                        } else if(widgetname) {
                            widgetid = widgetname + "container" + Math.round(Math.random() * 10000000);
                        }

                        // Check if the widget is an iframe widget
                        if (sakai.widgets[widgetname]) {

                            // Set the placement for the widget
                            var placement = "";
                            if (split[3] !== undefined){
                                var length = split[0].length + 1 + widgetname.length + 1 + widgetid.length + 1;
                                placement = id.substring(length);
                            } else if (context){
                                placement = context;
                            }

                            // Check if the widget exists
                            if (!widgetsInternal[widgetname]){
                                widgetsInternal[widgetname] = [];
                            }

                            // Set the initial properties for the widget
                            var index = widgetsInternal[widgetname].length;
                            widgetsInternal[widgetname][index] = {
                                uid : widgetid,
                                placement : placement,
                                id : id,
                                widgetData: widgetData[widgetid] || false,
                                callback: callback
                            };

                            var floating = "inline_class_widget_nofloat";
                            if ($(divarray[i]).hasClass("block_image_left")){
                                floating = "inline_class_widget_leftfloat";
                            } else if ($(divarray[i]).hasClass("block_image_right")){
                                floating = "inline_class_widget_rightfloat";
                            }

                            widgetsInternal[widgetname][index].floating = floating;
                            
                        }
                    }

                    for (i in widgetsInternal){
                        if (widgetsInternal.hasOwnProperty(i)) {
                            for (var ii = 0, jj = widgetsInternal[i].length; ii<jj; ii++) {

                                // Replace all the widgets with id "widget_" to widgets with new id's
                                // and add set the appropriate float class
                                $(document.getElementById(widgetsInternal[i][ii].id)).replaceWith($('<div id="'+widgetsInternal[i][ii].uid+'" class="' + widgetsInternal[i][ii].floating + '"></div>'));
                            }

                            var url = sakai.widgets[i].url;
                            batchWidgets[url] = i; //i is the widgetname
                        }
                    }

                    // Load the HTML files for the widgets
                    loadWidgetFiles(widgetsInternal, batchWidgets);

                };

                locateWidgets(id, showSettings, widgetData, context, callback);

                return {
                    "informOnLoad" : informOnLoad
                };
            }