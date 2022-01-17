function(type, node){
                    // console.debug("FactoryInput: type",type, " node:",node);
                    var xfControlDijit = registry.byId(bf.util.getXfId(node));
                    /*
                     xfControl is an instance of the XFControl class. This is the generic class that handles all interactions
                     with the XForms processor implementation. The concrete native browser or javascript controls are called
                     'widgets' in the context of the client side. They are the concrete representations the user interacts with.
                     @see: _createText() for more information about how to connect xfControl and a concrete Widget
                     */

                    switch(type){
                    //INPUT TYPE STRING
                        case "text":
                            this._createText(xfControlDijit,node);
                            xfControlDijit.setCurrentValue(domAttr.get(node,"value"));
                            break;
                    //INPUT TYPE BOOLEAN
                        case "checkbox":
                            this._createCheckbox(xfControlDijit, node);

                            break;
                    //INPUT TYPE DATE
                       case "date":
                            // console.debug("FactoryInput: found: .uaDesktop .xfInput.xsdDate .widgetContainer",node);
                            this._createDate(xfControlDijit, node);
                            break;
                       case "dropDownDate":
                            // console.debug("FactoryInput: found: .uaDesktop .xfInput.xsdDate .widgetContainer",node);
                            this._createDropDownDate(xfControlDijit, node);
                            break;
                        //INPUT TYPE DATE TIME
                        case "dateTime":
                            this._createDateTime(xfControlDijit,node);
                            break;
                        //INPUT TYPE TIME
                        case "timeTextBox":
                            this._createTimeTextBox(xfControlDijit,node);
                            break;
                        case "dropDownTime":
                            this._createDropDownTime(xfControlDijit,node);
                            break;
                        case "mobileDate":
                            this._createMobileDate(xfControlDijit, node);
                            break;
                        case "mobileDateTime":
                            this._createMobileDateTime(xfControlDijit, node);
                            break;
                        case "mobileTime":
                            this._createMobileTime(xfControlDijit, node);
                            break;
                        case "tbd":
                            console.warn("No handler for node", node, " yet");
                        default:
                            console.warn("FactoryInput.default");

                    }
                }