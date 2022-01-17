function (element) {

                    // TODO: Handle HTML 5 input types someday
                    
                    if ($(element).not(settings.ignoreFieldsSelector).length == 0) {
                        return false;
                    }

                    var type = element.type;
                    var isDirty = false;

                    if (type == "checkbox" || type == "radio") {
                        if (element.checked != element.defaultChecked) {
                            isDirty = true;
                        }
                    }
                    else if (type == "text" || type == "textarea") {
                        if (element.value != element.defaultValue) {
                            isDirty = true;
                        }
                    }
                    else if (settings.watchHiddenFields && type == "hidden") {
                        if (element.value != element.defaultValue) {
                            isDirty = true;
                        }
                    }
                    else if (type == "select-one" || type == "select-multiple") {
                        
                        var defaultsExist = false;

                        for (var j = 0; j < element.options.length; j++) {

                            if (element.options[j].selected != element.options[j].defaultSelected) {
                                isDirty = true;
                            }

                            if (element.options[j].defaultSelected) {
                                defaultsExist = true;
                            }
                        }
                        
                        if (!defaultsExist && element.options[0].selected) {
                            isDirty = false;
                        }
                    }

                    var eventSourceElement;

                    // figure out which element should trigger the event.
                    // if the element was dynamically added to the dom then the event should be triggered on that
                    if (settings.allDynamicSelectors)
                    {
                        var dynamicContainer = $(element).closest(settings.allDynamicSelectors);

                        if (dynamicContainer.length) {
                            eventSourceElement = dynamicContainer[0];
                            
                            if (!isDirty) {
                                return privateMethods.checkDynamic(dynamicContainer[0]);
                            }

                        } else {
                            eventSourceElement = element;
                        }
                    } else {
                        eventSourceElement = element;
                    }
                    
                    privateMethods.triggerDirtyOrCleanEvent(isDirty, eventSourceElement);

                    return isDirty;
                }