function(containerId, showSettings, widgetData, context){

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
                        if (sakai.widgets[widgetname] && sakai.widgets[widgetname].iframe){

                            // Get the information about the widget in the widgets.js file
                            var portlet = sakai.widgets[widgetname];

                            // Check if the scrolling property has been set to true
                            var scrolling = portlet.scrolling ? "auto" : "no";

                            var src = portlet.url;

                            // Construct the HTML for the iframe
                            var html = '<div id="widget_content_'+ widgetname + '">' +
                                           '<iframe src="'+ src +'" ' +
                                           'frameborder="0" ' +
                                           'height="'+ portlet.height +'px" ' +
                                           'width="100%" ' +
                                           'scrolling="' + scrolling + '"' +
                                           '></iframe></div>';

                            // Add the HTML for to the iframe widget container
                            $("#" + widgetid + "_container").html(html).addClass("fl-widget-content").parent().append('<div class="fl-widget-no-options fl-fix"><div class="widget-no-options-inner"><!-- --></div></div>');

                        }

                        // The widget isn't an iframe widget
                        else if (sakai.widgets[widgetname]){

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
                                widgetData: widgetData[widgetid] || false
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

                }