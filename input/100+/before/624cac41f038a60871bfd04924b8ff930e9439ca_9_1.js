function(widgetname){
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
                }